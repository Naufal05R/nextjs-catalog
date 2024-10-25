import { capitalize } from "@/lib/utils";
import { z } from "zod";

export const CategorySchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .transform((val) => capitalize(val)),
});

export const ProductSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters",
  }),
  price: z.preprocess((val) => Number(val), z.number().min(1, { message: "Price must be in positive number" })),
  discount: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .multipleOf(0.01)
      .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
  ),
});
