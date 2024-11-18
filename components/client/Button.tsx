"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Copy, CopyCheck, LucideProps, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";

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

export const ToggleButton = ({
  Icon,
  isActive,
  doAction,
  undoAction,
  identifier,
}: {
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  isActive: boolean;
  doAction: (prevState: void | undefined, formData: FormData) => Promise<void>;
  undoAction: (prevState: void | undefined, formData: FormData) => Promise<void>;
  identifier: string | number;
}) => {
  const [beforeState, beforeAction, beforePending] = useFormState(undoAction, undefined);
  const [afterState, afterAction, afterPending] = useFormState(doAction, undefined);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute right-3 top-3 z-30 grid place-items-center rounded-full bg-white text-amber-500 shadow-none hover:bg-white hover:text-amber-500"
      form="toggle-action-button"
    >
      <form id="toggle-action-button" action={isActive ? beforeAction : afterAction} className="hidden" />
      <input
        name="id"
        type="hidden"
        className="hidden"
        defaultValue={identifier}
        form="toggle-action-button"
        readOnly
      />
      <Icon fill={isActive ? "#f59e0b" : "#fff"} />
    </Button>
  );
};
