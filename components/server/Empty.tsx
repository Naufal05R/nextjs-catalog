import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  title: string;
  children?: React.ReactNode;
}

export interface EmptyStateWithButtonProps extends Omit<EmptyStateProps, "children"> {
  href: string;
  alt: string;
}

export const EmptyState = ({ title, children }: EmptyStateProps) => {
  return (
    <article className="flex size-full flex-col items-center justify-center space-y-4">
      <h4 className="max-w-[350px] text-center text-3xl font-medium">{title}</h4>
      {children}
    </article>
  );
};

export const EmptyStateWithButton = ({ href, alt, ...props }: EmptyStateWithButtonProps) => {
  return (
    <EmptyState {...props}>
      {href && (
        <Button asChild>
          <Link href={href}>{alt || "Click Me!"}</Link>
        </Button>
      )}
    </EmptyState>
  );
};
