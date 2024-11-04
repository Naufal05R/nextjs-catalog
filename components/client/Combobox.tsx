"use client";

import * as React from "react";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const list = ["feature", "bug", "enhancement", "documentation", "design", "question", "maintenance"];

interface ComboboxDropdownMenuProps {
  label: string;
  element: {
    trigger: React.JSX.Element;
  };
}

export function ComboboxDropdownMenu({ label, element }: ComboboxDropdownMenuProps) {
  const [selected, setSelected] = React.useState<string>();
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {selected ?? `Select ${label}`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] text-slate-500">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{element.trigger}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput placeholder="Filter label..." autoFocus={true} />
                <CommandList>
                  <CommandEmpty>No {label} found.</CommandEmpty>
                  <CommandGroup>
                    {list.map((item) => (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={(value) => {
                          setSelected(value);
                          setOpen(false);
                        }}
                      >
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">
            <CirclePlus />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
