import React from "react";

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
import { cn, slugify } from "@/lib/utils";
import { Dataset } from "@/types/data";

interface SelectProps<T extends Dataset, V extends keyof T[number]> {
  all?: boolean;
  data: T;
  value: V;
  label: Array<keyof T[number]>;
  side?: "bottom" | "top" | "right" | "left";
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  onValueChange?: (e: string) => void;
  defaultValue?: T[number][NoInfer<V>];
  placeholder?: string;
  classNames?: {
    trigger?: string;
    content?: string;
    item?: string;
  };
}

export function Select<T extends Dataset, V extends keyof T[number]>({
  all,
  data,
  value,
  label,
  side,
  selected,
  onValueChange,
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
    <SelectRoot
      defaultValue={
        typeof defaultValue === "string" && data.find(({ slug }) => slug === slugify(defaultValue))
          ? defaultValue
          : undefined
      }
      value={selected}
      onValueChange={onValueChange}
      disabled={!data.length}
    >
      <SelectTrigger
        className={cn("w-fit text-slate-500 shadow-none focus:ring-0", classNames?.trigger)}
        icon={<ChevronDown className="ml-2.5 size-4" />}
      >
        <SelectValue placeholder={placeholder || "Select an option"} />
      </SelectTrigger>
      <SelectContent side={side} className={cn("shadow-none", classNames?.content)}>
        <SelectGroup>
          {all && (
            <SelectItem value={"none"} className={cn("text-slate-500 focus:text-slate-800", classNames?.item)}>
              All
            </SelectItem>
          )}
          <Mapper
            data={data}
            render={(item, index) => (
              <SelectItem
                key={index}
                value={`${item[value]}`}
                className={cn("text-slate-500 focus:text-slate-800", classNames?.item)}
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
