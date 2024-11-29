import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";
import { ACCEPTED_IMAGE_EXTS, ACCEPTED_IMAGE_MIME_EXTS, MAX_FILE_SIZE } from "./media";
import { ThumbnailSchema } from "./thumbnail";

export const NewsSchema = z.object({
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
      message: "Title must be at least 3 characters",
    })
    .max(63, {
      message: "Title must be less than 63 characters",
    })
    .transform((val) => slugify(val)),
  description: z
    .string()
    .min(7, {
      message: "Description must be at least 7 characters",
    })
    .max(255, {
      message: "Description must be less than 255 characters",
    }),
  isRelevant: z.boolean().default(true),
  thumbnail: ThumbnailSchema,
});

export const NewsFormSchema = NewsSchema.pick({
  id: true,
  title: true,
  description: true,
  isRelevant: true,
}).merge(
  z.object({
    thumbnail: z
      .instanceof(File, { message: "Thumbnail must be a valid image." })
      .refine((file) => file.size, { message: "Thumnail is required." })
      .refine((file) => file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
      .refine((file) => Array.from<string>(ACCEPTED_IMAGE_MIME_EXTS).includes(file.type), {
        message: `Only "${ACCEPTED_IMAGE_EXTS.join('", "')}" formats are supported.`,
      }),
    content: z
      .string()
      .min(10, { message: "Minimum content size is 1kb" })
      .max(1048576, { message: "Maximum content size is 1mb" }),
    "images.file": z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, { message: "Max image size is 5MB." })
          .refine((file) => Array.from<string>(ACCEPTED_IMAGE_MIME_EXTS).includes(file.type), {
            message: `Only "${ACCEPTED_IMAGE_EXTS.join('", "')}" formats are supported.`,
          }),
      )
      .optional(),
    "images.id": z.array(z.string()).optional(),
  }),
);
