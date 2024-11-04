"use server";

import { CategorySchema } from "@/schema/category";
import { handlingError } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";

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
