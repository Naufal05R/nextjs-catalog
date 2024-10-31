"use server";

import { ProductFormSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError, slugify } from "../utils";
import { z } from "zod";

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
  collection,
}: {
  params: z.infer<typeof ProductFormSchema>;
  collection: string;
}) => {
  const validated = ProductFormSchema.safeParse(params);

  if (validated.success) {
    const { data: product } = validated;

    try {
      const newProduct = await prisma.$transaction(async (_prisma) => {
        const _collection = await _prisma.collection.findFirst({
          where: {
            slug: collection,
          },
        });

        const _newProduct = await _prisma.product.create({
          data: {
            ...product,
            slug: slugify(product.title),
            collectionId: _collection!.id,
          },
        });

        return _newProduct;
      });

      return newProduct;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};
