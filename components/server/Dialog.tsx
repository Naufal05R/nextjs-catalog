import { Button } from "@/components/ui/button";
import {
  Dialog as DialogRoot,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface DialogProps {
  header: {
    title: string;
    description?: string;
  };
  element: {
    trigger: React.JSX.Element;
    body: React.JSX.Element;
  };
  footer?: boolean;
}

export function Dialog({ header, element, footer = false }: DialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>{element.trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="break-all font-body">{header.title}</DialogTitle>
          <DialogDescription>{header.description}</DialogDescription>
        </DialogHeader>

        {element.body}

        {footer && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
