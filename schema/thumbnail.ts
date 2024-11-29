import { z } from "zod";

export const ThumbnailSchema = z.object({
  id: z.string().uuid(),
  exts: z.string().min(3, { message: "Not a valid extensions" }).max(4, { message: "Not a valid extensions" }),
  newsId: z.string().cuid(),
});
