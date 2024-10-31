import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(63, {
      message: "Title must be less than 63 characters",
    })
    .transform((val) => capitalize(val)),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters",
    })
    .max(63, {
      message: "Slug must be less than 63 characters",
    })
    .transform((val) => slugify(val)),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters",
  }),
  price: z.preprocess((val) => Number(val), z.number().min(1, { message: "Price must be in positive number" })),
  discount: z
    .preprocess(
      (val) => Number(val),
      z
        .number()
        .multipleOf(0.01)
        .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
    )
    .optional(),
  isSold: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const ProductFormSchema = ProductSchema.pick({
  title: true,
  description: true,
  price: true,
  discount: true,
});
