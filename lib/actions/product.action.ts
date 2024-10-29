"use server";

import { CollectionSchema, ProductSchema } from "@/schema/product";
import { prisma } from "../prisma";
import { handlingError } from "../utils";

export const createProductCollection = async (prevState: string | undefined, formData: FormData) => {
  const raw = {
    title: formData.get("title"),
  };
  const validated = CollectionSchema.safeParse(raw);

  if (validated.success) {
    console.log(validated);

    try {
      const { title } = validated.data;
      const newCollection = await prisma.collection.create({
        data: {
          title,
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

export const createProduct = async (formData: FormData) => {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    discount: formData.get("discount"),
  };
  const validated = ProductSchema.safeParse(raw);

  if (validated.success) {
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
