import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";
import { ProductSchema } from "./product";
import { SubcollectionSchema } from "./subcollection";

export const CollectionSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(15, {
      message: "Title must be less than 15 characters",
    })
    .transform((val) => capitalize(val)),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters",
    })
    .max(15, {
      message: "Slug must be less than 15 characters",
    })
    .transform((val) => slugify(val)),
  description: z.string().max(63, {
    message: "Description must be less than 63 characters",
  }),
  isFavorite: z.boolean().default(true),
  products: z.array(ProductSchema.required()).optional(),
  subcollections: z.array(SubcollectionSchema.required()).optional(),
  createdAt: z.preprocess((val) => new Date(String(val)), z.date().default(new Date())),
  updatedAt: z.preprocess((val) => new Date(String(val)), z.date().default(new Date())),
});

export const CollectionFormSchema = CollectionSchema.pick({
  title: true,
  description: true,
});

export const CollectionsSchema = z.array(CollectionSchema);
