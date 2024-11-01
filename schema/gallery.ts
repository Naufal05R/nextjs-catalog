import { z } from "zod";
import { ImageSchema } from "./image";
import { capitalize, slugify } from "@/lib/utils";

export const GallerySchema = z.object({
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
  images: z.array(ImageSchema.required()),
  productId: z.string().cuid(),
});

export const GalleryFormSchema = GallerySchema.pick({
  title: true,
  images: true,
});
