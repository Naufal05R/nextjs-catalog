import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email("This is not a valid email."),
  phone: z
    .string()
    .min(7, { message: "Not a valid phone number!" })
    .max(15, { message: "Not a valid phone number!" })
    .regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), "Not a valid phone number!"),
  message: z.string().min(2, {
    message: "Message must be at least 50 characters.",
  }),
});
