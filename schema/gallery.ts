import { z } from "zod";
import { MediaFormSchema, MediaSchema } from "./media";
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
  medias: z.array(MediaSchema.required()),
  productId: z.string().cuid(),
});

export const GalleryFormSchema = GallerySchema.pick({
  title: true,
}).merge(
  z.object({
    medias: z.array(MediaFormSchema.omit({ order: true })),
  }),
);
