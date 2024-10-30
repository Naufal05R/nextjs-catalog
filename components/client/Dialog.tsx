"use client";

import { useEffect, useState } from "react";
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
import { createProductCollection } from "@/lib/actions/product.action";
import { Boxes, CircleCheck } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { slugify } from "@/lib/utils";

interface DialogProps {
  trigger: {
    title: string;
    element: React.ElementType;
  };
  content: {
    title: string;
    description?: string;
    element?: React.JSX.Element;
  };
}

export function CreateCollectionDialog({ trigger, content }: DialogProps) {
  const [collection, formAction, isLoading] = useFormState(createProductCollection, "");
  const [open, setOpen] = useState(false);
  const [temporaryState, setTemporaryState] = useState<typeof collection>("");
  const { setNavigations } = useSidebar();

  useEffect(() => {
    if (collection) {
      setTemporaryState(collection);
      setNavigations((prevState) => ({
        ...prevState,
        navMain: [
          {
            title: "Products",
            url: `/dashboard/products`,
            icon: Boxes,
            isActive: true,
            items: [
              ...prevState.navMain[0].items,
              { title: collection, url: `/dashboard/products/${slugify(collection)}` },
            ],
          },
          ...prevState.navMain.filter((item) => item.title !== "Products"),
        ],
      }));
    }
  }, [collection, setNavigations]);

  return (
    <DialogRoot
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        if (!open) setTemporaryState("");
      }}
    >
      <DialogTrigger asChild>
        <trigger.element>{trigger.title}</trigger.element>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" closeButton={!temporaryState}>
        <form action={formAction} className="grid gap-4 py-4">
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
              <Button disabled={isLoading} type="submit">
                Save
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
