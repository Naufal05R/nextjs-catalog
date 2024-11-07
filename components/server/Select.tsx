import * as React from "react";

import {
  Select as SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Mapper from "./Mapper";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dataset } from "@/types/data";

interface SelectProps<T extends Dataset, V extends keyof T[number]> {
  data: T;
  value: V;
  label: Array<keyof T[number]>;
  side?: "bottom" | "top" | "right" | "left";
  defaultValue?: T[number][NoInfer<V>];
  placeholder?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    item?: string;
  };
}

export function Select<T extends Dataset, V extends keyof T[number]>({
  data,
  value,
  label,
  side,
  defaultValue,
  placeholder,
  classNames,
}: SelectProps<T, V>) {
  const printValue = (object: T[number]) =>
    label
      .reduce((acc, key) => `${acc.toString()} ${object[key]}`, "")
      .toString()
      .trim();

  return (
    <SelectRoot defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}>
      <SelectTrigger
        className={cn("w-fit text-slate-500 shadow-none focus:ring-0", classNames?.trigger)}
        icon={<ChevronDown className="ml-2.5 size-4" />}
      >
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent side={side} className={cn("shadow-none", classNames?.content)}>
        <SelectGroup>
          <Mapper
            data={data}
            render={(item) => (
              <SelectItem
                value={`${item[value]}`}
                className={cn("text-slate-400 focus:text-slate-800", classNames?.item)}
              >
                {printValue(item)}
              </SelectItem>
            )}
          />
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
