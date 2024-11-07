import React from "react";
import Link from "next/link";
import { Mail, Menu, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import { Select } from "./Select";
import { languages, navigations } from "@/constants";
import { currencies } from "@/constants";
import Mapper from "@/components/server/Mapper";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export const PublicHeader = () => {
  return (
    <header className="w-full">
      <p className="bg-slate-300 py-2 text-center text-xs font-normal max-sm:hidden">
        Embrace Timeless Beauty ✨ Your Adventure, Our Adornments 💍 Every Experience Sparkles with Joy
      </p>

      <nav className={cn(padding.x, "grid grid-cols-12 items-center justify-center py-8 lg:gap-y-8")}>
        <Link href="/" className="col-span-4 flex flex-row items-center justify-start text-slate-500 max-lg:hidden">
          <Mail className="mr-2.5" /> <span className="text-xs font-light">Get on the list</span>
        </Link>

        <menu className="col-span-6 text-slate-500 max-lg:order-first lg:hidden">
          <Button variant="ghost" size="icon" customize="icon" className="grid place-items-center">
            <Menu className="size-6" />
          </Button>
        </menu>

        <Link href="/" className="col-span-12 max-lg:py-4 lg:col-span-4">
          <h1 className="text-center text-3xl font-medium uppercase">Legenda Permata</h1>
        </Link>

        <menu className="col-span-6 flex flex-row items-center justify-end gap-4 text-slate-500 max-lg:-order-1 lg:col-span-4">
          <Select
            data={languages}
            label={["label"]}
            value={"key"}
            defaultValue="ID"
            classNames={{ trigger: "max-lg:hidden border-0" }}
          />
          <Select
            data={currencies}
            label={["key", "symbol"]}
            value={"key"}
            defaultValue="IDR"
            classNames={{ trigger: "max-lg:hidden border-0" }}
          />
          <Button variant="ghost" size="icon" customize="icon" className="grid place-items-center">
            <Search className="size-6" />
          </Button>
          <Button variant="ghost" size="icon" customize="icon" className="grid place-items-center">
            <ShoppingBag className="size-6" />
          </Button>
        </menu>

        <ul className="col-span-12 flex flex-row items-center justify-center max-lg:hidden">
          <Mapper
            data={navigations}
            render={({ label, href }) => (
              <Link href={href} className="px-4 py-2 font-light text-slate-600 hover:underline">
                {label}
              </Link>
            )}
          />
        </ul>
      </nav>

      <div className={padding.x}>
        <hr className="mx-0.5 -mb-px" />
      </div>
    </header>
  );
};

export const PrivateHeader = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
