import * as React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, phone, message }) => (
  <section className="flex size-full flex-col text-left">
    <h2 className="mb-8 bg-slate-100 p-8 text-center text-5xl font-black uppercase">LEGENDA PERMATA</h2>

    <article className="p-8">
      <h3 className="mb-4 text-2xl font-semibold">New message from {name}!</h3>
      <h4 className="text-xl text-slate-600">Email: {email}</h4>
      <h4 className="text-xl text-slate-600">Phone: {phone}</h4>

      <p className="mt-16">{message}</p>
    </article>

    <hr className="mx-8" />

    <article className="flex items-center gap-4 p-8">
      <Avatar className="size-12 rounded-full">
        <AvatarImage src="/avatars/shadcn.jpg" alt={name} />
        <AvatarFallback className="grid size-full place-items-center bg-slate-200">CN</AvatarFallback>
      </Avatar>
      <blockquote className="flex h-full flex-col text-sm">
        <p className="font-semibold">{name}</p>
        <p className="text-slate-600">{email}</p>
      </blockquote>
    </article>
  </section>
);
