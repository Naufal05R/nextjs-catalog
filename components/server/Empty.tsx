import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  href?: string;
  alt?: string;
}

export const EmptyState = ({ title, href, alt }: EmptyStateProps) => {
  return (
    <article className="flex size-full flex-col items-center justify-center space-y-4">
      <h4 className="max-w-[350px] text-center text-3xl font-medium">{title}</h4>
      {href && (
        <Button asChild>
          <Link href={href}>{alt || "Click Me!"}</Link>
        </Button>
      )}
    </article>
  );
};
