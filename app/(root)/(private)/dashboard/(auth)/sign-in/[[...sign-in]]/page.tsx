import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <section className="grid h-screen w-screen place-items-center">
      <fieldset className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-inherit p-4 shadow-lg">
        <form action="" />
        <h2 className="mb-8 text-xl uppercase">Legenda Permata</h2>
        <Label className="flex flex-col gap-2">
          Username
          <Input />
        </Label>
        <Label className="flex flex-col gap-2">
          Password
          <Input />
        </Label>
        <Button className="mt-8 w-full">Sign In</Button>
      </fieldset>
    </section>
  );
}
