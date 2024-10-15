import React from "react";
import Link from "next/link";
import { ChevronDown, Mail, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";

const Header = () => {
  return (
    <header className="w-full">
      <p className="bg-slate-300 py-2 text-center text-xs font-normal">
        Embrace Timeless Beauty ✨ Your Adventure, Our Adornments 💍 Every
        Experience Sparkles with Joy
      </p>

      <nav
        className={cn(
          padding.x,
          "flex flex-row flex-wrap items-center justify-center gap-y-8 py-8",
        )}
      >
        <Link
          href="/"
          className="flex w-1/2 flex-row items-center justify-start text-slate-500 lg:w-1/3"
        >
          <Mail className="mr-2.5" />{" "}
          <span className="text-xs font-light">Get on the list</span>
        </Link>

        <Link href="/" className="w-full lg:w-1/3">
          <h1 className="text-center text-3xl font-medium uppercase">
            App Title
          </h1>
        </Link>

        <div className="flex w-1/2 flex-row items-center justify-end text-slate-500 lg:w-1/3">
          <button className="flex flex-row items-center px-4 py-2">
            English <ChevronDown className="size-4" />
          </button>
          <button className="flex flex-row items-center px-4 py-2">
            English <ChevronDown className="size-4" />
          </button>
          <button className="ml-8 grid place-items-center">
            <Search className="size-7" />
          </button>
          <button className="ml-4 grid place-items-center">
            <ShoppingBag className="size-7" />
          </button>
        </div>

        <ul className="flex w-full flex-row items-center justify-center">
          {["Home", "Shop", "Guestbook", "About", "Blog", "Contact"].map(
            (item, index) => (
              <Link
                key={index}
                className="px-4 py-2 font-light text-slate-600 hover:underline"
                href="/"
              >
                {item}
              </Link>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
