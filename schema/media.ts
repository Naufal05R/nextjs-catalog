import { z } from "zod";
import { capitalize, slugify } from "@/lib/utils";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const ACCEPTED_IMAGE_MIME_EXTS = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;
export const ACCEPTED_VIDEO_MIME_EXTS = ["video/mp4", "video/mpeg", "video/avi", "video/wmv"] as const;

export const ACCEPTED_IMAGE_EXTS = ["jpeg", "jpg", "png", "webp"] as const;
export const ACCEPTED_VIDEO_EXTS = ["mp4", "mpeg", "avi", "wmv"] as const;

export const ACCEPTED_MEDIA_MIME_TYPES = [...ACCEPTED_IMAGE_MIME_EXTS, ...ACCEPTED_VIDEO_MIME_EXTS];
export const ACCEPTED_MEDIA_TYPES = [...ACCEPTED_IMAGE_EXTS, ...ACCEPTED_VIDEO_EXTS];

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
    .nullable()
    .refine((file) => file && file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
    .refine((file) => file && Array.from<string>(ACCEPTED_MEDIA_MIME_TYPES).includes(file.type), {
      message: `Only "${ACCEPTED_MEDIA_TYPES.join('", "')}" formats are supported.`,
    }),
  galleryId: z.string().cuid(),
});

export const MediaFormSchema = MediaSchema.pick({
  title: true,
  order: true,
  media: true,
});

export const MediaDefaultSchema = z.array(
  MediaSchema.pick({
    title: true,
    name: true,
    order: true,
  }),
);
