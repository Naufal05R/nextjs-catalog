"use server";

import { CategoryFormSchema, CategorySchema } from "@/schema/category";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export const getCategory = async (identifier: string, field: keyof z.infer<typeof CategorySchema>) => {
  try {
    const category = await prisma.collection.findFirst({
      where: {
        [field]: identifier,
      },
    });

    return category;
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

export const createCategory = async (prevState: string | z.ZodIssue[] | undefined, formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to add new category!");
  }

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const { success, data, error } = CategoryFormSchema.safeParse(raw);

  if (success) {
    try {
      const { title, description } = data;
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
    return error.errors;
  }
};
