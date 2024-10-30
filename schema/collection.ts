import { capitalize } from "@/lib/utils";
import { z } from "zod";

export const CollectionSchema = z.object({
  id: z.string().cuid(),
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters",
    })
    .max(64, {
      message: "Title must be less than 64 characters",
    })
    .transform((val) => capitalize(val)),
  slug: z.string().min(3, {
    message: "Url must be at least 3 characters",
  }),
});

export const CollectionFormSchema = CollectionSchema.pick({
  title: true,
});

export const CollectionsSchema = z.array(CollectionSchema);
