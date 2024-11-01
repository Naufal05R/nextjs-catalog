import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";

export const ImageSchema = z.object({
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
  name: z
    .string()
    .min(7, {
      message: "Slug must be at least 7 characters",
    })
    .max(19, {
      message: "Slug must be less than 19 characters",
    })
    .transform((val) => slugify(val)),
  order: z.preprocess((val) => Number(val), z.number().int().min(0).max(999)),
  galleryId: z.string().cuid(),
});

export const ImageFormSchema = ImageSchema.pick({
  title: true,
  order: true,
});
