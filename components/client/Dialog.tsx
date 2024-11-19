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

interface DialogProps {
  content: {
    title: string;
    description?: string;
    element?: React.JSX.Element;
  };
}

interface CreateCollectionDialogProps extends DialogProps {
  list?: Array<Collection>;
  setList?: React.Dispatch<React.SetStateAction<Array<Collection>>>;
  trigger: {
    title: string;
    element: React.ElementType;
  };
}

export const CreateCollectionDialog = ({ trigger, content, setList }: CreateCollectionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [collection, formAction, isLoading] = useFormState(createCollection, undefined);
  const [temporaryState, setTemporaryState] = useState<string>();

  useEffect(() => {
    if (collection) {
      setTemporaryState(collection.title);
      if (setList) setList((prevState) => [...prevState, collection]);
    }
  }, [collection, setList]);

  return (
    <DialogRoot
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (!open) setTemporaryState("");
      }}
    >
      <DialogTrigger asChild className="hover:cursor-pointer">
        <trigger.element>{trigger.title}</trigger.element>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" closeButton={!temporaryState}>
        <form id="create-collection-form" action={formAction} />
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
              Successfully created new collection called{" "}
              <span className="bg-blue-600 px-2 text-white">{temporaryState}</span>{" "}
            </h4>
          </div>
        ) : (
          content.element
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
