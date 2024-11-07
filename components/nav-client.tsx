import { BaseSheet, BaseSheetProps } from "@/components/server/Sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavClientProps extends Pick<BaseSheetProps, "side"> {
  title: string;
  description?: string;
}

export function NavClient({ side, title, description }: NavClientProps) {
  return (
    <BaseSheet
      side={side}
      header={{ title, description }}
      element={{
        trigger: (
          <Button variant="ghost" size="icon" customize="icon" className="grid place-items-center">
            <Menu className="size-6" />
          </Button>
        ),
        content: <></>,
      }}
    />
  );
}
