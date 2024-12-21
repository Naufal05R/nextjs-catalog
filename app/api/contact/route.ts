import { ContactEmail } from "@/components/mail/Contact";
import { ContactFormSchema } from "@/schema/contact";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const rawData = await request.json();
    const { success, data: information, error } = ContactFormSchema.safeParse(rawData);

    if (success) {
      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev", "tantraahmad7@gmail.com"],
        subject: "Masuk ke ta",
        react: await ContactEmail(information),
      });

      if (error) {
        return Response.json({ error }, { status: 500 });
      }

      return Response.json(data);
    } else {
      return Response.json(error);
    }
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
