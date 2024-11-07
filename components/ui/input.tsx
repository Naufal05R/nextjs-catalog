import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-2.5 py-3.5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
  {
    variants: {
      customize: {
        "no-focus": "focus-visible:ring-0",
      },
    },
    defaultVariants: {
      customize: null,
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, customize, type, ...props }, ref) => {
  return <input type={type} className={cn(inputVariants({ customize, className }))} ref={ref} {...props} />;
});
Input.displayName = "Input";

export { Input };
