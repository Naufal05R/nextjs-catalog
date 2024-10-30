"use server";

import { ProductFormSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError, slugify } from "../utils";
import { z } from "zod";

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
