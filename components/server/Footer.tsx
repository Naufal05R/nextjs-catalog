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

// TODO: Should implement Change Language Feature
// TODO: Should implement Change Currency Feature

import { /* Dot, */ Mail } from "lucide-react";
import { /* currencies, */ /* footers, */ navigations } from "@/constants";
// import { Select } from "./Select";
// import { languages } from "@/constants";
import Mapper from "./Mapper";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <>
      <section className={cn(padding.x, "pb-4 pt-16")}>
        <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4 py-12 sm:border-y lg:flex-nowrap lg:gap-8">
          <fieldset className="w-full xs:w-3/4 lg:max-w-80">
            <form id="subscription-form" action=""></form>

            <h6 className="mb-2 text-lg">Get updates</h6>
            <article className="flex flex-row flex-wrap rounded border border-slate-200 p-1 xs:max-w-screen-xs xs:flex-nowrap">
              <label htmlFor="footer_subscribe" className="flex flex-1 origin-center flex-row items-center">
                <Mail className="mx-2 text-slate-500" />
                <input
                  id="footer_subscribe"
                  placeholder="Your email"
                  form="subscription-form"
                  type="text"
                  className="w-full appearance-none bg-transparent py-2 text-sm font-light placeholder:text-sm focus:outline-none focus:ring-0"
                />
              </label>

              <Button
                className="w-fit rounded-sm bg-slate-800 px-4 py-2 text-sm text-slate-50 max-xs:hidden"
                form="subscription-form"
              >
                Subscribe
              </Button>
            </article>

            <Button
              className="mt-2 w-full rounded-sm bg-slate-800 px-4 py-2 text-sm text-slate-50 xs:hidden"
              form="subscription-form"
            >
              Subscribe
            </Button>
          </fieldset>

          <ul className="grid w-full grid-cols-6 gap-x-8 max-sm:mt-8 max-sm:divide-y max-sm:border-y lg:flex-1">
            <Mapper
              data={navigations}
              render={({ label, href }) => (
                <Link
                  href={href}
                  className="col-span-6 py-4 text-sm max-sm:hover:text-slate-800/75 sm:col-span-3 sm:py-2 sm:hover:underline md:col-span-2"
                >
                  {label}
                </Link>
              )}
            />
          </ul>
        </div>
      </section>

      <footer
        className={cn(padding.x, "grid grid-cols-12 items-center justify-between gap-y-8 pb-24 pt-8 md:gap-y-24")}
      >
        {/* <menu className="col-span-12 flex w-full flex-row gap-4">
          <Select data={languages} label={["label"]} value={"key"} defaultValue="ID" />
          <Select data={currencies} label={["key", "symbol"]} value={"key"} defaultValue="IDR" />
        </menu> */}

        <blockquote className="col-span-12 flex flex-col gap-x-1 text-xs text-slate-500 xs:flex-row xs:items-center md:col-span-4 md:flex-col md:items-start">
          <p className="w-fit">Copyright © {new Date().getFullYear()} LEGENDA PERMATA </p>
          {/* <Dot className="max-xs:hidden md:hidden" />
          <Link
            href="https://naufalrabbani.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit hover:underline"
          >
            Developed by Naufal Rabbani
          </Link> */}
        </blockquote>

        <ul className="col-span-12 flex flex-row flex-wrap items-center gap-2 md:col-span-8 md:justify-end">
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
