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
  state: z
    .string()
    .min(3, {
      message: "Original State must be at least 3 characters",
    })
    .max(63, {
      message: "Original State must be less than 63 characters",
    }),
  width: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .multipleOf(0.01)
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  height: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .multipleOf(0.01)
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  length: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .multipleOf(0.01)
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  weight: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .multipleOf(0.01)
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
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
  isReady: z.boolean().default(true),
  collectionId: z.string().cuid(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const ProductFormSchema = ProductSchema.pick({
  title: true,
  description: true,
  price: true,
  discount: true,
  state: true,
});
