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
    <SelectRoot>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <Mapper
            data={data}
            render={(item) => (
              <SelectItem defaultChecked={item[value] === defaultValue} value={`${item[value]}`}>
                {printValue(item)}
              </SelectItem>
            )}
          />
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
