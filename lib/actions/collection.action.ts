"use server";

import { CollectionFormSchema, CollectionSchema } from "@/schema/collection";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";
import { z } from "zod";

export const getCollection = async (identifier: string, field: keyof z.infer<typeof CollectionSchema>) => {
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

export const getAllCollection = async () => {
  try {
    const allCollections = await prisma.collection.findMany();

    return allCollections;
  } catch (error) {
    handlingError(error);
  }
};

export const createCollection = async (prevState: string | undefined, formData: FormData) => {
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

      return newCollection.title;
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
    } catch (error) {
      handlingError(error);
    }
  }
};
