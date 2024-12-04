"use server";

import { CategoryFormSchema } from "@/schema/category";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

type GetAllCategoryProps = {
  where?: Prisma.CategoryWhereInput;
};

export const getAllCategory = async (params: GetAllCategoryProps | undefined = undefined) => {
  const { where } = params ?? {};
  try {
    const allCategories = await prisma.category.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return allCategories;
  } catch (error) {
    handlingError(error);
  }
};

export const getCategory = async (params: GetAllCategoryProps | undefined = undefined) => {
  const { where } = params ?? {};
  try {
    const category = await prisma.category.findFirst({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return category;
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
