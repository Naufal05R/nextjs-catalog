"use server";

import { ProductFormSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError, slugify } from "../utils";
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
  collection,
}: {
  params: z.infer<typeof ProductFormSchema>;
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

        const _category = await _prisma.category.findFirst({
          where: {
            id: product.categoryId,
          },
        });

        if (!_category) throw new Error("Category not found");

        const _newProduct = await _prisma.product.create({
          data: {
            ...product,
            slug: slugify(product.title),
            collectionId: _collection!.id,
            categoryId: _category!.id,
          },
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
