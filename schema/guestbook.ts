import { z } from "zod";

export const GuestbookFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 2 characters.",
  }),
  origin: z.string().min(5, {
    message: "Origin must be at least 5 characters.",
  }),
  message: z.string().min(50, {
    message: "Message must be at least 50 characters.",
  }),
});
