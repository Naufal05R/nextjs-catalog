"use server";

import { CollectionFormSchema } from "@/schema/collection";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { Collection, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

type GetAllCollectionProps = {
  where?: Prisma.CollectionWhereInput;
};

export const getAllCollection = async (params: GetAllCollectionProps | undefined = undefined) => {
  const { where } = params ?? {};
  try {
    const allCollections = await prisma.collection.findMany({
      where,
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

export const createCollection = async (prevState: Collection | undefined, formData: FormData) => {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const validated = CollectionFormSchema.safeParse(raw);

  if (validated.success) {
    try {
      const { title, description } = validated.data;
      const newCollection = await prisma.collection.create({
        data: {
          title,
          slug: slugify(title),
          description,
        },
      });

      return newCollection;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};

export const toggleFavoriteCollection = async (prevState: string | undefined, formData: FormData) => {
  const id = formData.get("id") as string;

  if (id) {
    try {
      await prisma.$transaction(async (_prisma) => {
        await _prisma.collection.updateMany({
          where: {
            isFavorite: true,
          },
          data: {
            isFavorite: false,
          },
        });

        await _prisma.collection.update({
          where: { slug: id },
          data: {
            isFavorite: true,
          },
        });
      });

      revalidatePath("/", "layout");

      return undefined;
    } catch (error) {
      handlingError(error);
    }
  }
};
