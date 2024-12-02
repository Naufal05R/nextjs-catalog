"use server";

import { ContactFormSchema } from "@/schema/contact";
import { initRawData } from "../utils";
import { ZodIssue } from "zod";
import { resend } from "../resend";
import { ContactEmail } from "@/components/mail/Contact";

export const createContactMessage = async (prevState: string | ZodIssue[] | undefined, formData: FormData) => {
  const { success, data: information, error } = ContactFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { data, error } = await resend.emails.send({
      from: "Developer <support@naufalrabbani.com>",
      to: ["delivered@resend.dev" /* "tantraahmad7@gmail.com" */],
      subject: "Masuk ke ta?",
      react: ContactEmail(information),
    });

    if (error) {
      return error.message;
    }

    if (data) {
      return data.id;
    }
  } else {
    return error.errors;
  }
};
