import { z } from "zod";
import { capitalize, slugify } from "@/lib/utils";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

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
  image: z
    .instanceof(File)
    .refine((file) => file && file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
    .refine((file) => file && ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), {
      message: `Only "${ACCEPTED_IMAGE_TYPES.join('", "')}" formats are supported.`,
    }),
  galleryId: z.string().cuid(),
});

export const ImageFormSchema = ImageSchema.pick({
  title: true,
  order: true,
  image: true,
});
