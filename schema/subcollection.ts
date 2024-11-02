import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";
import { ProductSchema } from "./product";

export const SubcollectionSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(31, {
      message: "Title must be less than 31 characters",
    })
    .transform((val) => capitalize(val)),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters",
    })
    .max(31, {
      message: "Slug must be less than 31 characters",
    })
    .transform((val) => slugify(val)),
  description: z
    .string()
    .min(7, {
      message: "Description must be at least 7 characters",
    })
    .max(63, {
      message: "Description must be less than 63 characters",
    }),
  products: z.array(ProductSchema.required()).optional(),
  collectionId: z.string().cuid(),
});

export const SubcollectionFormSchema = SubcollectionSchema.pick({
  title: true,
  description: true,
});

export const SubcollectionsSchema = z.array(SubcollectionSchema);
