"use client";

import React, { useEffect, useState } from "react";
import Mapper from "@/components/server/Mapper";

import { cn } from "@/lib/utils";

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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Category } from "@prisma/client";
import { Dataset } from "@/types/data";

import { Check, ChevronsUpDown, LayoutList, PlusCircle } from "lucide-react";
import { CreateCategoryDialog } from "@/components/client/Dialog";
import { Input } from "@/components/ui/input";

interface ComboboxDropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenu> {
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
      separator?: boolean;
      group?: boolean;
    }[];
  };
  classNames?: {
    menu?: {
      trigger?: string;
      content?: string;
      group?: string;
      sub?: {
        trigger?: string;
        content?: string;
      };
    };
    separator?: string;
    item?: string;
  };
}

const ComboboxDropdownMenu = React.forwardRef<React.ElementRef<typeof DropdownMenu>, ComboboxDropdownMenuProps>(
  ({ element, classNames }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 540);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 540);
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild ref={ref}>
          {element.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "w-[calc(var(--radix-dropdown-menu-trigger-width)*3/4)] min-w-[240px] max-w-[240px] p-0",
            classNames?.menu?.content,
          )}
          align="start"
        >
          <Mapper
            data={element.content}
            render={({ group, separator, element }, index) => {
              const Group = (children: React.ReactNode, Element: typeof DropdownMenuGroup) => (
                <Element className={classNames?.menu?.group}>{children}</Element>
              );

              const SubItem = () =>
                element.type === "menuSub" ? (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className={classNames?.menu?.sub?.trigger}>
                      {element.trigger}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent
                      alignOffset={isMobile ? 100 : -5}
                      sideOffset={isMobile ? -235 : 0}
                      className={classNames?.menu?.sub?.content}
                    >
                      {element.content}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ) : undefined;

              const Item = () =>
                element.type === "menuItem" ? (
                  <DropdownMenuItem className={classNames?.item} onSelect={(e) => e.preventDefault()} asChild>
                    {element.content}
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
                // TODO: Should remove unused key when bug fixed by react or nextjs
                <React.Fragment key={index}>
                  {group ? Group(Switcher(), DropdownMenuGroup) : Switcher()}
                  {separator && <Separator className={classNames?.separator} />}
                </React.Fragment>
              );
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

ComboboxDropdownMenu.displayName = "ComboboxDropdownMenu";

interface ComboboxDropdownCategoryProps<T extends Dataset> extends React.ComponentPropsWithoutRef<typeof DropdownMenu> {
  data: T;
  form: string;
  defaultSelected?: string;
}

export const ComboboxDropdownCategory = React.forwardRef<
  React.ElementRef<typeof DropdownMenu>,
  ComboboxDropdownCategoryProps<Array<Category>>
>(({ data, form, defaultSelected }, ref) => {
  const [selected, setSelected] = useState<string | undefined>(defaultSelected);

  return (
    <ComboboxDropdownMenu
      ref={ref}
      element={{
        trigger: (
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className={cn("justify-between rounded-none px-2.5 shadow-none", selected && "text-slate-500")}
          >
            {selected ? data.find(({ id }) => id === selected)?.title : "Select Category"}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            <Input
              id="categoryId"
              name="categoryId"
              className="hidden"
              type="hidden"
              defaultValue={selected}
              form={form}
              readOnly
              hidden
            />
          </Button>
        ),
        content: [
          {
            group: true,
            separator: true,
            element: {
              type: "menuSub",
              trigger: (
                <>
                  <LayoutList className="mr-2 size-4" />
                  Select Category
                </>
              ),
              content: (
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {!!data.length && (
                        <Mapper
                          data={data}
                          render={({ title, id }) => (
                            // TODO: Should remove unused key when bug fixed by nextjs or react
                            <CommandItem
                              key={id}
                              value={title}
                              onSelect={() => {
                                setSelected(id);
                              }}
                            >
                              <Check className={cn("mr-2 size-4", id === selected ? "opacity-100" : "opacity-0")} />
                              {title}
                            </CommandItem>
                          )}
                        />
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              ),
            },
          },
          {
            group: true,
            element: {
              type: "menuItem",
              content: (
                <CreateCategoryDialog
                  trigger={
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full justify-start gap-2 rounded-none px-2 text-sm font-normal"
                    >
                      <PlusCircle className="mr-2" />
                      Create Category
                    </Button>
                  }
                />
              ),
            },
          },
        ],
      }}
      classNames={{
        menu: {
          group: "p-1",
        },
      }}
    />
  );
});

ComboboxDropdownCategory.displayName = "ComboboxDropdownCategory";
