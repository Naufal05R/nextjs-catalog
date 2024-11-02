import { z } from "zod";
import { capitalize, slugify } from "@/lib/utils";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_VIDEO_MIME_TYPES = ["video/mp4", "video/mpeg", "video/avi", "video/wmv"];

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
const ACCEPTED_VIDEO_TYPES = ["mp4", "mpeg", "avi", "wmv"];

export const ACCEPTED_MEDIA_MIME_TYPES = ACCEPTED_IMAGE_MIME_TYPES.concat(ACCEPTED_VIDEO_MIME_TYPES);
export const ACCEPTED_MEDIA_TYPES = ACCEPTED_IMAGE_TYPES.concat(ACCEPTED_VIDEO_TYPES);

export const MediaSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(127, {
      message: "Title must be less than 127 characters",
    })
    .transform((val) => capitalize(val)),
  slug: z
    .string()
    .min(3, {
      message: "Slug must be at least 3 characters",
    })
    .max(127, {
      message: "Slug must be less than 127 characters",
    })
    .transform((val) => slugify(val)),
  name: z
    .string()
    .min(7, {
      message: "Slug must be at least 7 characters",
    })
    .max(131, {
      message: "Slug must be less than 131 characters",
    })
    .transform((val) => slugify(val)),
  order: z.preprocess((val) => Number(val), z.number().int().min(0).max(999)),
  media: z
    .instanceof(File)
    .refine((file) => file && file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
    .refine((file) => file && ACCEPTED_MEDIA_MIME_TYPES.includes(file.type), {
      message: `Only "${ACCEPTED_MEDIA_TYPES.join('", "')}" formats are supported.`,
    }),
  galleryId: z.string().cuid(),
});

export const MediaFormSchema = MediaSchema.pick({
  title: true,
  order: true,
  media: true,
});
