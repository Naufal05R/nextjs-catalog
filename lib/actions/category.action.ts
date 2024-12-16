"use server";

import { CategoryFormSchema } from "@/schema/category";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { checkSecurityIssue } from "./error.action";
import { serviceError } from "../utils/error";

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
  try {
    await checkSecurityIssue();

    const raw = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    const { success, data, error } = CategoryFormSchema.safeParse(raw);

    if (success) {
      const { title, description } = data;
      const newCategory = await prisma.category.create({
        data: {
          title,
          slug: slugify(title),
          description,
        },
      });

      revalidatePath("/", "layout");
      return newCategory.title;
    } else {
      return error.errors;
    }
  } catch (error) {
    return serviceError(error);
  }
};
