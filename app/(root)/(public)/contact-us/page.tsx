import { ContactForm } from "@/components/client/Form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact our support for more information",
};

const ContactUsPage = () => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Contact Us</h4>
      <blockquote className="text-sm text-slate-500">
        <p>E-MAIL : tantraahmad7@gmail.com</p>
        <br />
        <p>Phone Number : +62 899 9812 808</p>
      </blockquote>

      <ContactForm />
    </section>
  );
};

export default ContactUsPage;
