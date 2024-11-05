"use server";

import { ProductFormSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError, padValue, slugify } from "../utils";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getAllProduct = async () => {
  try {
    const allProducts = await prisma.product.findMany();

    return allProducts;
  } catch (error) {
    handlingError(error);
  }
};

export const getProducts = async (identifier: string, field: keyof z.infer<typeof ProductSchema>) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        [field]: identifier,
      },
    });

    return product;
  } catch (error) {
    handlingError(error);
  }
};

export const createProduct = async ({
  params,
  files,
  collection,
}: {
  params: z.infer<typeof ProductFormSchema>;
  files: Array<{
    title?: string;
    preview?: string | ArrayBuffer | null;
    order?: number;
  }>;
  collection: string;
}) => {
  const _files = files
    .sort((a, b) => a.order! - b.order!)
    .map(({ title, order, preview }) => {
      if (typeof title === "string" && typeof order === "number" && typeof preview !== "undefined")
        return {
          title,
          order,
          preview,
        };
    })
    .filter((item) => item !== undefined);

  console.log(_files);

  const validated = ProductFormSchema.safeParse(params);

  const imageBuffer = Buffer.from(arrayBuffer);

  const uniqueId = generateId("image");
  const fileName = `${uniqueId}.${getExtension(file.name)}`;

  const objectParams: Parameters<typeof createObject>[0] = {
    bucketName: "nextjs-gallery",
    objectName: fileName,
    objectStream: imageBuffer,
    objectMetaData: {
      name,
      category,
      gallery,
      tags,
    },
  };

  const result = await createObject(objectParams);

  if (validated.success) {
    const { data: product } = validated;
    let pathname: string = `/dashboard/products/${collection}/add`;

    try {
      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        if (!_collection) throw new Error("Collection not found");

        const _newProduct = await _prisma.product.create({
          data: {
            ...product,
            slug: slugify(product.title),
            collectionId: _collection.id,
          },
        });

        const _gallery = await _prisma.gallery.create({
          data: {
            title: product.title,
            slug: slugify(product.title),
            productId: _newProduct.id,
          },
        });

        await _prisma.media.createMany({
          data: _files.map(({ title, order }) => {
            return {
              galleryId: _gallery.id,
              title,
              slug: slugify(title),
              order,
              name: `${padValue(order)}_${slugify(title)}`,
            };
          }),
        });

        return _newProduct;
      });

      pathname = `/dashboard/products/${collection}`;
      revalidatePath(`/dashboard/products/${collection}`);
      return newProduct;
    } catch (error) {
      handlingError(error);
    } finally {
      redirect(pathname);
    }
  } else {
    handlingError(validated.error);
  }
};
