import React from "react";
import Link from "next/link";
import { padding } from "@/lib/styles";
import { cn } from "@/lib/utils";
import {
  AmericanExpress,
  DinersClub,
  Discover,
  JCB,
  Maestro,
  Mastercard,
  PayPal,
  UnionPay,
  Venmo,
  Visa,
} from "@/components/svg";
import { Mail } from "lucide-react";
import { currencies } from "@/constants";
import { Select } from "./Select";
import languages from "@/constants/language";

const Footer = () => {
  return (
    <>
      <section className={cn(padding.x, "pb-4 pt-16")}>
        <div className="flex w-full flex-row items-center justify-between border-y py-12">
          <form action="">
            <h6 className="mb-2 text-lg">Get updates</h6>
            <fieldset className="flex flex-row flex-nowrap rounded border border-slate-200 p-1">
              <label htmlFor="footer_subscribe" className="flex flex-1 origin-center flex-row items-center">
                <Mail className="mx-2 text-slate-500" />
                <input
                  id="footer_subscribe"
                  placeholder="Your email"
                  type="text"
                  className="w-full appearance-none bg-transparent text-sm font-light placeholder:text-sm focus:outline-none focus:ring-0"
                />
              </label>

              <button className="rounded-sm bg-slate-800 px-4 py-2 text-sm text-slate-50">Subscribe</button>
            </fieldset>
          </form>

          <ul className="grid grid-cols-6 gap-x-8 gap-y-4">
            {[
              "Search",
              "Shipping",
              "Return and Refund",
              "Privacy Policy",
              "Terms of Service",
              "Contact Us",
              "Do not sell my personal information",
            ].map((link, linkIndex) => (
              <Link href="/" key={linkIndex} className="col-span-3 text-sm hover:underline lg:col-span-2">
                {link}
              </Link>
            ))}
          </ul>
        </div>
      </section>

      <footer className={cn(padding.x, "flex flex-row flex-wrap items-center justify-between gap-y-24 pb-24 pt-8")}>
        <menu className="flex w-full flex-row gap-4">
          <Select data={languages} label={["label"]} value={"key"} defaultValue="ID" />
          <Select data={currencies} label={["key", "symbol"]} value={"key"} defaultValue="IDR" />
        </menu>

        <blockquote className="text-xs text-slate-500">
          <p>Copyright © {new Date().getFullYear()} LEGENDA PERMATA</p>
          <Link href="https://naufalrabbani.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Developed by Naufal Rabbani
          </Link>
        </blockquote>

        <ul className="flex flex-row items-center gap-2">
          {[AmericanExpress, DinersClub, Discover, JCB, Maestro, Mastercard, PayPal, UnionPay, Venmo, Visa].map(
            (Icon, index) => (
              <li key={index}>
                <Icon />
              </li>
            ),
          )}
        </ul>
      </footer>
    </>
  );
};

export default Footer;
