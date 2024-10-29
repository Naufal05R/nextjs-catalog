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
import { FormHTMLAttributes } from "react";

interface DialogProps {
  actionHandler: FormHTMLAttributes<HTMLFormElement>["action"];
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

export function Dialog({ actionHandler, trigger, content }: DialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <trigger.element>{trigger.title}</trigger.element>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={actionHandler} className="grid gap-4 py-4">
          <DialogHeader>
            <DialogTitle className="font-body">{content.title}</DialogTitle>
            <DialogDescription>{content.description}</DialogDescription>
          </DialogHeader>
          {content.element}
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}
