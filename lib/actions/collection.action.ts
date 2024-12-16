"use server";

import { CollectionFormSchema } from "@/schema/collection";
import { handlingError, initRawData, slugify } from "../utils";
import { prisma } from "../prisma";
import { Collection, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { checkSecurityIssue } from "./error.action";
import { serviceError } from "../utils/error";

type GetAllCollectionProps = {
  where?: Prisma.CollectionWhereInput;
};

export const getAllCollection = async (params: GetAllCollectionProps | undefined = undefined) => {
  const { where } = params ?? {};
  try {
    const allCollections = await prisma.collection.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return allCollections;
  } catch (error) {
    handlingError(error);
  }
};

export const getCollection = async (params: GetAllCollectionProps | undefined = undefined) => {
  const { where } = params ?? {};

  try {
    const collection = await prisma.collection.findFirst({
      where,
    });

    return collection;
  } catch (error) {
    handlingError(error);
  }
};

export const createCollection = async (prevState: Collection | z.ZodIssue[] | undefined, formData: FormData) => {
  try {
    await checkSecurityIssue();

    const { success, data, error } = CollectionFormSchema.safeParse(initRawData(formData));

    if (success) {
      const { title, description } = data;
      const newCollection = await prisma.collection.create({
        data: {
          title,
          slug: slugify(title),
          description,
        },
      });

      return newCollection;
    } else {
      return error.errors;
    }
  } catch (error) {
    return serviceError(error);
  }
};

export const toggleFavoriteCollection = async (prevState: Collection | undefined, formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to favorite collection!");
  }

  const id = formData.get("id") as string;

  if (id) {
    try {
      const collection = await prisma.$transaction(async (_prisma) => {
        await _prisma.collection.updateMany({
          where: {
            isFavorite: true,
          },
          data: {
            isFavorite: false,
          },
        });

        const toggledCollection = await _prisma.collection.update({
          where: { id },
          data: {
            isFavorite: true,
          },
        });

        return toggledCollection;
      });

      revalidatePath("/", "layout");

      return collection;
    } catch (error) {
      handlingError(error);
    }
  }
};
