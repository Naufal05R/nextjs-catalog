import { z } from "zod";
import { GalleryFormSchema } from "./gallery";
import { capitalize, slugify } from "@/lib/utils";

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
  state: z
    .string()
    .min(3, {
      message: "Original State must be at least 3 characters",
    })
    .max(63, {
      message: "Original State must be less than 63 characters",
    }),
  color: z
    .string()
    .min(3, {
      message: "Color must be described at least 3 characters",
    })
    .max(63, {
      message: "Color must be described less than 63 characters",
    }),
  width: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "Width is required and must be in positive number" })
      .multipleOf(0.01, { message: "Width can only have 2 decimal places" })
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  height: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "Height is required and must be in positive number" })
      .multipleOf(0.01, { message: "Height can only have 2 decimal places" })
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  length: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "Length is required and must be in positive number" })
      .multipleOf(0.01, { message: "Length can only have 2 decimal places" })
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  weight: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, { message: "Weight is required and must be in positive number" })
      .multipleOf(0.01, { message: "Weight can only have 2 decimal places" })
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Price is required and must be in positive number" }),
  ),
  discount: z
    .preprocess(
      (val) => Number(val),
      z
        .number()
        .multipleOf(0.01, { message: "Discount can only have 2 decimal places" })
        .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
    )
    .nullable(),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters",
  }),
  isReady: z.boolean().default(true),
  collectionId: z.string().cuid(),
  subcollectionId: z.string().cuid().optional(),
  categoryId: z.string().min(1, { message: "Please select a Category" }).cuid({ message: "Invalid Category" }),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const ProductFormSchema = ProductSchema.pick({
  title: true,
  state: true,
  color: true,
  width: true,
  height: true,
  length: true,
  weight: true,
  price: true,
  discount: true,
  description: true,
  categoryId: true,
}).merge(GalleryFormSchema);
