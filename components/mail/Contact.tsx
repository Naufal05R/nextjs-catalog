import * as React from "react";
import { Img, Link, Tailwind } from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<EmailTemplateProps>> = ({ name, email, phone, message }) => (
  <Tailwind>
    <section className="flex size-full flex-col text-left">
      <h2 className="mb-8 mt-0 bg-slate-100 p-8 text-center text-5xl font-black uppercase">LEGENDA PERMATA</h2>

      <article className="p-8">
        <h3 className="mb-4 text-2xl font-semibold">New message from {name}!</h3>
        <h4 className="text-xl text-slate-600">Email: {email}</h4>
        <h4 className="text-xl text-slate-600">Phone: {phone}</h4>

        <p className="mt-16">{message}</p>
      </article>

      <hr className="mx-8" />

      <article className="flex items-center gap-4 p-8">
        <Link className="inline-flex size-12 overflow-hidden rounded-full" href="#">
          <Img alt="X" src="https://github.com/shadcn.png" style={{ height: "48px", width: "48px" }} />
        </Link>
        <blockquote className="m-0 flex h-full flex-col text-sm">
          <p className="m-0 font-semibold">{name}</p>
          <p className="m-0 text-slate-600">{email}</p>
        </blockquote>
      </article>
    </section>
  </Tailwind>
);
