import React from "react";
import Link from "next/link";
import { Mail, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import { Select } from "./Select";
import languages from "@/constants/language";
import { currencies } from "@/constants";

const Header = () => {
  return (
    <header className="w-full">
      <p className="bg-slate-300 py-2 text-center text-xs font-normal">
        Embrace Timeless Beauty ✨ Your Adventure, Our Adornments 💍 Every Experience Sparkles with Joy
      </p>

      <nav className={cn(padding.x, "flex flex-row flex-wrap items-center justify-center gap-y-8 py-8")}>
        <Link href="/" className="flex w-1/2 flex-row items-center justify-start text-slate-500 lg:w-1/3">
          <Mail className="mr-2.5" /> <span className="text-xs font-light">Get on the list</span>
        </Link>

        <Link href="/" className="w-full lg:w-1/3">
          <h1 className="text-center text-3xl font-medium uppercase">App Title</h1>
        </Link>

        <menu className="flex w-1/2 flex-row items-center justify-end gap-4 text-slate-500 lg:w-1/3">
          <Select
            data={languages}
            label={["label"]}
            value={"key"}
            defaultValue="ID"
            classNames={{ trigger: "border-0" }}
          />
          <Select
            data={currencies}
            label={["key", "symbol"]}
            value={"key"}
            defaultValue="IDR"
            classNames={{ trigger: "border-0" }}
          />
          <button className="ml-4 grid place-items-center">
            <Search className="size-6" />
          </button>
          <button className="grid place-items-center">
            <ShoppingBag className="size-6" />
          </button>
        </menu>

        <ul className="flex w-full flex-row items-center justify-center">
          {["Home", "Shop", "Guestbook", "About", "Blog", "Contact"].map((item, index) => (
            <Link key={index} className="px-4 py-2 font-light text-slate-600 hover:underline" href="/">
              {item}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
