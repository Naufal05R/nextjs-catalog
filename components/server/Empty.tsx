import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface WithButtonProps {
  href: string;
  alt: string;
}

export interface EmptyStateBaseProps {
  title: string;
  variant: "button" | "blank";
}

export interface EmptyStateBlankVariantProps extends EmptyStateBaseProps {
  variant: "blank";
  props: {};
}

export interface EmptyStateButtonVariantProps extends EmptyStateBaseProps {
  variant: "button";
  props: WithButtonProps;
}

type EmptyStateProps = EmptyStateBlankVariantProps | EmptyStateButtonVariantProps;

export const EmptyState = ({ title, variant, props }: EmptyStateProps) => {
  const Component = () => {
    if (variant === "blank") {
      return <></>;
    }

    if (variant === "button") {
      const { href, alt } = props;
      return (
        <Button asChild>
          <Link href={href || "/"}>{alt || "Click Me!"}</Link>
        </Button>
      );
    }
  };

  return (
    <article className="flex size-full flex-col items-center justify-center space-y-4">
      <h4 className="max-w-[350px] text-center text-3xl font-medium">{title}</h4>
      <Component />
    </article>
  );
};
