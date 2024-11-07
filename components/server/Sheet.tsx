import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
}

export const BaseSheet = ({ side, header, element }: BaseSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{element.trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{header.description}</SheetTitle>
          <SheetDescription>{header.description}</SheetDescription>
        </SheetHeader>
        {element.content}
      </SheetContent>
    </Sheet>
  );
};
