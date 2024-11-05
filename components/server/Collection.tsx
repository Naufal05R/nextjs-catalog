import Link from "next/link";
import React from "react";
import Mapper from "./Mapper";

import { cn } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { Image, Media } from "./Media";
import { getImageSrc } from "@/lib/actions/image.action";
import { Collection as Placeholder } from "../svg";

interface CollectionProps {
  title: string;
  description: string;
  href: string;
  classNames?: {
    wrapper?: string;
    picture?: string;
    title?: string;
    description?: string;
  };
}

const CollectionPlaceholder = async ({
  product,
  name,
  collection,
  index,
}: {
  product: string;
  name: string;
  collection: string;
  index: number;
}) => {
  const src = await getImageSrc({ product, name, collection });

  return (
    <Image
      src={src || "/"}
      alt={name}
      fill
      classNames={{
        figure: cn("aspect-square row-span-2 col-span-2", {
          "row-span-1 col-span-1": index,
        }),
      }}
      FallbackComponent={!index ? Placeholder : undefined}
    />
  );
};

const Collection = async ({ title, description, href, classNames }: CollectionProps) => {
  const collectionId = await prisma.collection
    .findUnique({
      where: {
        title,
      },
      select: {
        id: true,
      },
    })
    .then((collection) => collection!.id);
  const products = await prisma.product.findMany({
    take: 3,
    where: {
      collectionId,
    },
    select: {
      slug: true,
      collection: {
        select: {
          slug: true,
        },
      },
      gallery: {
        select: {
          medias: {
            take: 1,
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <Link href={href} className={cn("flex-1", classNames?.wrapper)}>
      <picture className={cn("grid grid-cols-3 grid-rows-2 gap-px overflow-hidden rounded", classNames?.picture)}>
        <Mapper
          data={Array.from({ length: 3 })}
          render={(_, pictureIndex) => {
            if (!products[pictureIndex]) {
              return (
                <Media
                  classNames={{
                    figure: cn("aspect-square row-span-2 col-span-2", {
                      "row-span-1 col-span-1": pictureIndex,
                    }),
                  }}
                  FallbackComponent={!pictureIndex ? Placeholder : undefined}
                />
              );
            }

            const { gallery, slug, collection } = products[pictureIndex];

            return (
              gallery && (
                <CollectionPlaceholder
                  product={slug}
                  name={gallery.medias[0].name}
                  collection={collection.slug}
                  index={pictureIndex}
                />
              )
            );
          }}
        />
      </picture>

      <figcaption className="mt-4 text-lg capitalize">{title}</figcaption>
      <p className="mt-1 text-sm uppercase text-slate-500">{description}</p>
    </Link>
  );
};

export default Collection;
