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

interface SelectProps<T extends Array<{ [key: string]: unknown }>, V extends keyof T[number]> {
  data: T;
  value: V;
  label: Array<keyof T[number]>;
  defaultValue?: T[number][NoInfer<V>];
}

export function Select<T extends Array<{ [key: string]: unknown }>, V extends keyof T[number]>({
  data,
  value,
  label,
  defaultValue,
}: SelectProps<T, V>) {
  const printValue = (object: T[number]) =>
    label
      .reduce((acc, key) => `${acc.toString()} ${object[key]}`, "")
      .toString()
      .trim();

  return (
    <SelectRoot defaultValue={typeof defaultValue === "string" ? defaultValue : undefined}>
      <SelectTrigger
        className="w-fit text-slate-500 shadow-none focus:ring-0"
        icon={<ChevronDown className="ml-2.5 size-4" />}
      >
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent className="shadow-none">
        <SelectGroup>
          <Mapper
            data={data}
            render={(item) => (
              <SelectItem value={`${item[value]}`} className="text-slate-400 focus:text-slate-800">
                {printValue(item)}
              </SelectItem>
            )}
          />
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
