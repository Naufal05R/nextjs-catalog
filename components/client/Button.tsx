"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Copy, CopyCheck, LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { toast as sonner } from "sonner";

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
  icon,
  isActive,
  doAction,
  undoAction,
  identifier,
}: {
  icon: React.ReactNode;
  isActive: boolean;
  doAction: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;
  undoAction: (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;
  identifier: string | number;
}) => {
  const [beforeState, beforeAction, beforePending] = useFormState(undoAction, undefined);
  const [afterState, afterAction, afterPending] = useFormState(doAction, undefined);

  useEffect(() => {
    if (!!beforeState) {
      sonner.error(
        <blockquote>
          <h5 className="break-all text-sm">
            <strong>Error: </strong> <strong>{beforeState}</strong>
          </h5>
        </blockquote>,
        { duration: 10000 },
      );
    }
    if (!!afterState) {
      sonner.error(
        <blockquote>
          <h5 className="break-all text-sm">
            <strong>Error: </strong> <strong>{afterState}</strong>
          </h5>
        </blockquote>,
        { duration: 10000 },
      );
    }
  }, [beforeState, afterState]);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute right-3 top-3 z-30 grid place-items-center rounded-full bg-white text-amber-500 shadow-none hover:bg-white hover:text-amber-500"
      form="toggle-action-button"
      disabled={beforePending || afterPending}
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
      {icon}
    </Button>
  );
};
