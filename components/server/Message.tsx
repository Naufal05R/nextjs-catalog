import { z } from "zod";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { DataKeys } from "@/types/data";

interface InputFieldMessageProps<T, Z extends z.ZodSchema>
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  schema: Z;
  errors?: T | unknown;
  name: DataKeys<z.infer<Z>>;
}

export const InputFieldMessage = <T extends z.ZodIssue[], Z extends z.ZodSchema>({
  errors,
  name,
  ...props
}: InputFieldMessageProps<T, Z>) => {
  return (
    typeof name === "string" &&
    errors instanceof Array &&
    !!errors?.length && (
      <p {...props} className={cn("mt-1 text-xs text-rose-500", props.className)}>
        {Array.from<T[number]>(errors).find(({ path }) => path.includes(name))?.message}
      </p>
    )
  );
};
