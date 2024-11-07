import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";

export interface BaseSheetProps {
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
  header: {
    title: string;
    description?: string;
  };
  element: {
    trigger: React.JSX.Element;
    content: React.JSX.Element;
  };
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const BaseSheet = ({ open, setOpen, side, header, element }: BaseSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{element.trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle className="text-2xl">{header.title}</SheetTitle>
          <SheetDescription>{header.description}</SheetDescription>
        </SheetHeader>
        {element.content}
      </SheetContent>
    </Sheet>
  );
};
