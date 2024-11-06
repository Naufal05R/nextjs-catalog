"use server";

import { ProductFormSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError, padValue, slugify } from "../utils";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createObject } from "../service";

export const getAllProduct = async (identifier?: string, field?: keyof z.infer<typeof ProductSchema>) => {
  try {
    const allProducts = await prisma.product.findMany({
      where: identifier && field && { [field]: identifier },
      include: {
        collection: {
          select: {
            slug: true,
          },
        },
        gallery: {
          select: {
            medias: {
              take: 1,
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

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
      include: {
        gallery: {
          select: {
            medias: {
              take: 1,
              where: {
                order: 0,
              },
              select: {
                name: true,
              },
            },
          },
        },
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
    title: string;
    preview: string | ArrayBuffer | null;
    order: number;
  }>;
  collection: string;
}) => {
  const validated = ProductFormSchema.safeParse(params);

  if (validated.success) {
    const { data: product } = validated;
    let pathname: string = `/dashboard/products/${collection}/add`;

    try {
      for (const { title, order, preview } of files) {
        const imageBuffer = Buffer.from(preview as ArrayBuffer);
        const fileName = `${padValue(order)}_${slugify(title)}`;
        const objectParams: Parameters<typeof createObject>[0] = {
          bucketName: "nextjs-catalog",
          objectName: `${slugify(collection)}/${slugify(product.title)}/${fileName}`,
          objectStream: imageBuffer,
          objectMetaData: {
            title,
            order,
          },
        };

        await createObject(objectParams);
      }

      const _files = files
        .sort((a, b) => a.order - b.order)
        .map(({ title, order }) => {
          const fileName = `${padValue(order)}_${slugify(title)}`;

          return { title, slug: slugify(title), order, name: fileName };
        });

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
          data: _files.map((file) => {
            return {
              galleryId: _gallery.id,
              ...file,
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
