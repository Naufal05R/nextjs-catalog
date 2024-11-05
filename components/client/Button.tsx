"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Copy, CopyCheck, LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const CopyButton = ({ title }: { title: string }) => {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const Icon = ({ copied, ...props }: { copied?: true } & LucideProps) =>
    copied ? <CopyCheck strokeWidth={1.75} {...props} /> : <Copy strokeWidth={1.75} {...props} />;

  const [icon, setIcon] = useState(<Icon />);

  return (
    <Button
      variant={"secondary"}
      className={cn(
        "flex max-h-full flex-1 items-center gap-2 text-slate-600 shadow-none transition-colors disabled:opacity-100",
        {
          "text-slate-400": copied,
        },
      )}
      disabled={copied}
      onClick={() => {
        navigator.clipboard.writeText(`${SERVER_URL}${pathname}`);
        setCopied(true);

        setTimeout(() => {
          setIcon(<Icon copied />);
        }, 100);

        setTimeout(() => {
          setIcon(<Icon />);
          setCopied(false);
        }, 3000);
      }}
    >
      {title} {icon}
    </Button>
  );
};
