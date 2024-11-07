import { z } from "zod";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface InputFieldMessageProps<T>
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  errors?: T | unknown;
  name: string;
}

export const InputFieldMessage = <T extends z.ZodIssue[]>({ errors, name, ...props }: InputFieldMessageProps<T>) => {
  return (
    errors instanceof Array &&
    !!errors?.length && (
      <p {...props} className={cn("mt-1 text-xs text-rose-500", props.className)}>
        {Array.from<T[number]>(errors).find(({ path }) => path.includes(name))?.message}
      </p>
    )
  );
};
