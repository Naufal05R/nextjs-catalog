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
  const validated = ProductFormSchema.safeParse(params);

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

        const _files = files
          .sort((a, b) => a.order! - b.order!)
          .map(({ title, order }) => {
            if (typeof title === "string" && typeof order === "number")
              return {
                title,
                order,
              };
          })
          .filter((item) => item !== undefined);

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
