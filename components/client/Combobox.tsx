"use client";

import React from "react";
import Mapper from "@/components/server/Mapper";

import { z } from "zod";
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
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ProductFormSchema } from "@/schema/product";
import { Category } from "@prisma/client";
import { Dataset } from "@/types/data";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Check, ChevronsUpDown, LayoutList, PlusCircle } from "lucide-react";
import { CreateCategoryDialog, CreateCollectionDialog } from "./Dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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

const ComboboxDropdownMenu = ({ element, classNames }: ComboboxDropdownMenuProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{element.trigger}</DropdownMenuTrigger>
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
};

interface ComboboxDropdownCategoryProps<T extends Dataset> {
  data: T;
  field: ControllerRenderProps<z.infer<typeof ProductFormSchema>, keyof z.infer<typeof ProductFormSchema>>;
  form: UseFormReturn<z.infer<typeof ProductFormSchema>>;
}

export const ComboboxDropdownCategory = <T extends Array<Category>>({
  data,
  field,
  form,
}: ComboboxDropdownCategoryProps<T>) => {
  return (
    <ComboboxDropdownMenu
      element={{
        trigger: (
          <FormControl>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className={cn("justify-between rounded-none px-2.5 shadow-none", !field.value && "text-slate-500")}
            >
              {field.value ? data.find((category) => category.id === field.value)?.title : "Select Category"}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
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
                                form.setValue("categoryId", id);
                              }}
                            >
                              <Check className={cn("mr-2 size-4", id === field.value ? "opacity-100" : "opacity-0")} />
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
};
