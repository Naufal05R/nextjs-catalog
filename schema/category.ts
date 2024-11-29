import { z } from "zod";
import { ProductSchema } from "./product";
import { capitalize, slugify } from "@/lib/utils";

export const CategorySchema = z.object({
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
  products: z.array(ProductSchema.required()),
});

export const CategoryFormSchema = CategorySchema.pick({
  title: true,
  description: true,
});
