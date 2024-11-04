"use server";

import { CategoryFormSchema, CategorySchema } from "@/schema/category";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const getCategory = async (identifier: string, field: keyof z.infer<typeof CategorySchema>) => {
  try {
    const collection = await prisma.collection.findFirst({
      where: {
        [field]: identifier,
      },
    });

    return collection;
  } catch (error) {
    handlingError(error);
  }
};

export const getAllCategory = async () => {
  try {
    const allCategories = await prisma.category.findMany();

    return allCategories;
  } catch (error) {
    handlingError(error);
  }
};

export const createCategory = async (prevState: string | undefined, formData: FormData) => {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const validated = CategoryFormSchema.safeParse(raw);

  if (validated.success) {
    console.log(validated);

    try {
      const { title, description } = validated.data;
      const newCategory = await prisma.category.create({
        data: {
          title,
          slug: slugify(title),
          description,
        },
      });

      revalidatePath("/dashboard/");
      return newCategory.title;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};
