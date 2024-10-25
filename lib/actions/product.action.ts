"use server";

import { ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError } from "../utils";

export const createProduct = async (formData: FormData) => {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount"),
  };
  const validated = ProductSchema.safeParse(raw);

  if (validated.success) {
    console.log(validated);

    try {
      const product = validated.data;
      const newProduct = await prisma.product.create({
        data: {
          ...product,
          slug: product.title.toLowerCase().trim().replace(/\s+/g, "-"),
        },
      });

      // return newProduct;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log(validated.error);
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
