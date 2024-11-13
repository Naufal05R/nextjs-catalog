import { capitalize, slugify } from "@/lib/utils";
import { z } from "zod";

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
});
