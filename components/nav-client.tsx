"use client";

import { BaseSheet, BaseSheetProps } from "@/components/server/Sheet";
import { Button } from "@/components/ui/button";

// TODO: Should implement Sidebar Search Feature
// !OR NOT

import { /* currencies, */ /* languages, */ navigations } from "@/constants";
import { Menu /* Search */ } from "lucide-react";

// TODO: Should implement Change Language Feature
// TODO: Should implement Change Currency Feature

import Mapper from "./server/Mapper";
import Link from "next/link";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
import { useState } from "react";
// import { Select } from "./server/Select";

interface NavClientProps extends Pick<BaseSheetProps, "side"> {
  title: string;
  description?: string;
}

export function NavClient({ side, title, description }: NavClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseSheet
      open={open}
      setOpen={setOpen}
      side={side}
      header={{ title, description }}
      element={{
        trigger: (
          <Button variant={null} size="icon" customize="icon" className="grid place-items-center">
            <Menu className="size-6" />
          </Button>
        ),
        content: (
          <article className="mt-2 flex flex-col">
            {/* <fieldset className="text-slate-400">
              <Label htmlFor="search" className="relative flex flex-row">
                <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
                <Input id="search" className="rounded-none pl-9 shadow-none" customize="no-focus" />
              </Label>
            </fieldset> */}

            {/* <menu className="mt-4 flex w-full flex-row gap-4">
              <Select
                data={languages}
                label={["label"]}
                value={"key"}
                defaultValue="ID"
                side="bottom"
                classNames={{ trigger: "flex-1" }}
              />
              <Select
                data={currencies}
                label={["key", "symbol"]}
                value={"key"}
                defaultValue="IDR"
                side="bottom"
                classNames={{ trigger: "flex-1" }}
              />
            </menu> */}

            <ul className="mt-4 flex w-full flex-col justify-center gap-px">
              <Mapper
                data={navigations}
                render={({ label, href }) => (
                  // TODO: Should remove key after bug fixed by nextjs or react
                  <Button key={href} asChild variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
                    <Link href={href} className="px-4 py-2 font-light">
                      {label}
                    </Link>
                  </Button>
                )}
              />
            </ul>
          </article>
        ),
      }}
    />
  );
}
