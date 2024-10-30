"use server";

import { ProductFormSchema } from "@/schema/product";
import { CollectionFormSchema } from "@/schema/collection";
import { prisma } from "../prisma";
import { handlingError, slugify } from "../utils";
import { z } from "zod";

export const createProductCollection = async (prevState: string | undefined, formData: FormData) => {
  const raw = {
    title: formData.get("title"),
  };
  const validated = CollectionFormSchema.safeParse(raw);

  if (validated.success) {
    console.log(validated);

    try {
      const { title } = validated.data;
      const newCollection = await prisma.collection.create({
        data: {
          title,
          slug: slugify(title),
        },
      });

      return newCollection.title;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};

export const createProduct = async (raw: z.infer<typeof ProductFormSchema>) => {
  const validated = ProductFormSchema.safeParse(raw);

  if (validated.success) {
    try {
      const product = validated.data;
      const newProduct = await prisma.product.create({
        data: {
          ...product,
          slug: slugify(product.title),
        },
      });

      return newProduct;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};

export const getAllProduct = async () => {
  try {
    const allProducts = await prisma.product.findMany();

    return allProducts;
  } catch (error) {
    handlingError(error);
  }
};
