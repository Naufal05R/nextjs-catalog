"use client";

import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog as DialogRoot,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck } from "lucide-react";
import { createCollection } from "@/lib/actions/collection.action";
import { createCategory } from "@/lib/actions/category.action";
import { Collection } from "@prisma/client";
import { SidebarMenuSubButton } from "../ui/sidebar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { InputFieldMessage } from "../server/Message";
import { DataKeys } from "@/types/data";
import { z } from "zod";
import { CollectionFormSchema } from "@/schema/collection";

interface DialogProps {
  content: {
    title: string;
    description?: string;
    element?: React.JSX.Element;
  };
}

interface CreateCollectionDialogProps {
  list?: Array<Collection>;
  setList?: React.Dispatch<React.SetStateAction<Array<Collection>>>;
}

export const CreateCollectionDialog = ({ setList }: CreateCollectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, isLoading] = useFormState(createCollection, undefined);
  const [temporaryState, setTemporaryState] = useState<string>();

  useEffect(() => {
    if (state && !Array.isArray(state)) {
      setTemporaryState(state.title);
      if (setList) setList((prevState) => [...prevState, state]);
    }
  }, [state, setList]);

  const ErrorMessage = <T extends DataKeys<z.infer<typeof CollectionFormSchema>>>({ name }: { name: T }) => {
    return <InputFieldMessage schema={CollectionFormSchema} errors={state} name={name} className="" />;
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (!open) setTemporaryState("");
      }}
    >
      <DialogTrigger asChild className="hover:cursor-pointer">
        <SidebarMenuSubButton>New Collections</SidebarMenuSubButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" closeButton={!temporaryState}>
        <form id="create-collection-form" action={formAction} />
        {temporaryState ? (
          ""
        ) : (
          <DialogHeader>
            <DialogTitle className="font-body">Create New Collections</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        )}
        {temporaryState ? (
          <div className="flex flex-col items-center justify-center gap-8">
            <CircleCheck size={64} className="text-blue-600" />
            <h4 className="text-center text-2xl font-semibold text-blue-600">
              Successfully created new collection called{" "}
              <span className="bg-blue-600 px-2 text-white">{temporaryState}</span>{" "}
            </h4>
          </div>
        ) : (
          <fieldset disabled={isLoading} className="space-y-6 sm:space-y-4">
            <article className="grid grid-cols-4 items-start gap-2 sm:gap-4">
              <Label htmlFor="Collections" className="text-left max-sm:col-span-4 sm:py-[11px]">
                Title
              </Label>
              <div className="col-span-4 sm:col-span-3">
                <Input id="Collections" name="title" form="create-collection-form" />
                <ErrorMessage name="title" />
              </div>
            </article>
            <article className="grid grid-cols-4 items-start gap-2 sm:gap-4">
              <Label htmlFor="description" className="text-left max-sm:col-span-4 sm:py-[11px]">
                Description
              </Label>
              <div className="col-span-4 sm:col-span-3">
                <Textarea rows={3} id="description" name="description" form="create-collection-form" />
                <ErrorMessage name="description" />
              </div>
            </article>
          </fieldset>
        )}
        {!temporaryState && (
          <DialogFooter>
            <Button disabled={isLoading} type="submit" form="create-collection-form">
              Save
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
};

interface CreateCategoryDialog extends React.ComponentPropsWithoutRef<typeof DialogRoot>, DialogProps {
  trigger: React.ReactNode;
}

export const CreateCategoryDialog = React.forwardRef<React.ElementRef<typeof DialogRoot>, CreateCategoryDialog>(
  ({ trigger, content }, ref) => {
    const [open, setOpen] = useState(false);
    const [category, formAction, isLoading] = useFormState(createCategory, "");
    const [temporaryState, setTemporaryState] = useState<typeof category>("");

    useEffect(() => {
      if (category) {
        setTemporaryState(category);
      }
    }, [category]);

    return (
      <DialogRoot
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          if (!open) setTemporaryState("");
        }}
      >
        <DialogTrigger asChild className="hover:cursor-pointer" ref={ref}>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" closeButton={!temporaryState}>
          <form id="create-category-form" action={formAction} />
          {temporaryState ? (
            ""
          ) : (
            <DialogHeader>
              <DialogTitle className="font-body">{content.title}</DialogTitle>
              <DialogDescription>{content.description}</DialogDescription>
            </DialogHeader>
          )}
          {temporaryState ? (
            <div className="flex flex-col items-center justify-center gap-8">
              <CircleCheck size={64} className="text-blue-600" />
              <h4 className="text-center text-2xl font-semibold text-blue-600">
                Successfully created new <br /> category called{" "}
                <span className="bg-blue-600 px-2 text-white">{temporaryState}</span>{" "}
              </h4>
            </div>
          ) : (
            content.element
          )}
          {!temporaryState && (
            <DialogFooter>
              <Button disabled={isLoading} type="submit" form="create-category-form">
                Save
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogRoot>
    );
  },
);

CreateCategoryDialog.displayName = "CreateCategoryDialog";
