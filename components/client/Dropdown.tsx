"use client";

import * as React from "react";

import { Dataset } from "@/types/data";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Mapper from "../server/Mapper";

interface DropdownProps<T extends Dataset> {
  data: T;
  value: keyof T[number];
  label: Array<keyof T[number]>;
}

export function Dropdown<T extends Dataset>({ data, value, label }: DropdownProps<T>) {
  const [position, setPosition] = React.useState("bottom");

  const printValue = (object: T[number]) =>
    label
      .reduce((acc, key) => `${acc.toString()} ${object[key]}`, "")
      .toString()
      .trim();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-40 w-56 overflow-scroll">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <Mapper
            data={data}
            render={(item) => (
              <DropdownMenuRadioItem value={`${item[value]}`}>{printValue(item)}</DropdownMenuRadioItem>
            )}
          />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
