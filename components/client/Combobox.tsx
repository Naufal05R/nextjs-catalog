"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild ref={ref}>
          {element.trigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            "w-[calc(var(--radix-dropdown-menu-trigger-width)*3/4)] min-w-[200px] max-w-[240px] p-0",
            classNames?.menu?.content,
          )}
          align="start"
        >
          <Mapper
            data={element.content}
            render={({ group, separator, element }) => {
              const Group = (children: React.ReactNode, Element: typeof DropdownMenuGroup) => (
                <Element className={classNames?.menu?.group}>{children}</Element>
              );

              const SubItem = () =>
                element.type === "menuSub" ? (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className={classNames?.menu?.sub?.trigger}>
                      {element.trigger}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className={classNames?.menu?.sub?.content}>
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
                <>
                  {group ? Group(Switcher(), DropdownMenuGroup) : Switcher()}
                  {separator && <Separator className={classNames?.separator} />}
                </>
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
}

export const ComboboxDropdownCategory = React.forwardRef<
  React.ElementRef<typeof DropdownMenu>,
  ComboboxDropdownCategoryProps<Array<Category>>
>(({ data, form }, ref) => {
  const [selected, setSelected] = useState<string>();

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
              value={selected}
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
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {!!data.length && (
                        <Mapper
                          data={data}
                          render={({ title, id }) => (
                            <CommandItem
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
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 rounded-none px-2 text-sm font-normal"
                    >
                      <PlusCircle className="mr-2" />
                      Create Category
                    </Button>
                  }
                  content={{
                    title: `Create New Category`,
                    element: (
                      <>
                        <fieldset className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-left">
                            Title
                          </Label>
                          <Input id="title" name="title" className="col-span-3" form="create-category-form" />
                        </fieldset>
                        <fieldset className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="py-[11px] text-left">
                            Description
                          </Label>
                          <Textarea
                            rows={3}
                            id="description"
                            name="description"
                            className="col-span-3"
                            form="create-category-form"
                          />
                        </fieldset>
                      </>
                    ),
                  }}
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
