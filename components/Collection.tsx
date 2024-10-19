import Link from "next/link";
import React from "react";
import Image from "./Image";
import { cn } from "@/lib/utils";
import { Collection as Placeholder } from "./svg";

interface CollectionProps {
  title: string;
  description: string;
  href: string;
}

const Collection = ({ title, description, href }: CollectionProps) => {
  return (
    <Link href={href} className="flex-1 overflow-hidden rounded">
      <picture className="grid grid-cols-3 grid-rows-2 gap-px">
        {Array.from({ length: 3 }).map((_, pictureIndex) => (
          <Image
            key={pictureIndex}
            src={`/dummy_${pictureIndex + 1}.jpg`}
            alt={`dummy_${pictureIndex + 1}`}
            fill
            classNames={{
              figure: cn("aspect-square row-span-2 col-span-2", {
                "row-span-1 col-span-1": pictureIndex,
              }),
            }}
            FallbackComponent={!pictureIndex ? Placeholder : undefined}
          />
        ))}
      </picture>

      <figcaption className="mt-4 text-lg capitalize">{title}</figcaption>
      <p className="mt-1 text-sm uppercase text-slate-500">{description}</p>
    </Link>
  );
};

export default Collection;
