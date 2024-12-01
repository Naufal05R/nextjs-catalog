import { SignInForm } from "@/components/client/Form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) redirect("/dashboard");

  return (
    <section className="grid h-screen w-screen place-items-center">
      <SignInForm />
    </section>
  );
}
