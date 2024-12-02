import { ContactEmail } from "@/components/mail/Contact";
import { resend } from "@/lib/resend";

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Developer <support@naufalrabbani.com>",
      to: ["delivered@resend.dev" /* "tantraahmad7@gmail.com" */],
      subject: "Masuk ke ta?",
      react: ContactEmail({ firstName: "John" }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
