"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "../ui/separator";

interface ComboboxDropdownMenuProps {
  element: {
    trigger: React.JSX.Element;
    content: {
      element: {} & (
        | {
            type: "menuItem";
            content: React.JSX.Element;
          }
        | {
            type: "menuSub";
            trigger: React.JSX.Element;
            content: React.JSX.Element;
          }
      );
      separator?: React.JSX.Element;
      group?: boolean;
    }[];
  };
}

export function ComboboxDropdownMenu({ element }: ComboboxDropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{element.trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[calc(var(--radix-dropdown-menu-trigger-width)*3/4)] min-w-[200px] max-w-[240px] p-0"
        align="start"
      >
        {element.content.map(({ group, separator, element }) => {
          const Group = (children: React.ReactNode, Element: React.ElementType) => <Element>{children}</Element>;
          const SubItem = () =>
            element.type === "menuSub" ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>{element.trigger}</DropdownMenuSubTrigger>
                {element.content}
              </DropdownMenuSub>
            ) : undefined;
          const Item = () =>
            element.type === "menuItem" ? (
              <DropdownMenuItem>
                <DropdownMenuSubContent>{element.content}</DropdownMenuSubContent>
              </DropdownMenuItem>
            ) : undefined;

          const Switcher = () => {
            switch (element.type) {
              case "menuItem":
                return Item();
              case "menuSub":
                return SubItem();
              default:
                break;
            }
          };

          return (
            <>
              {group ? Group(Switcher(), DropdownMenuGroup) : Switcher()}
              {separator && <Separator />}
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
