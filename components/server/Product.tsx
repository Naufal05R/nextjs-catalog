import React from "react";
import Link from "next/link";

import { Archive, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, countDiscount, formatPrice } from "@/lib/utils";
import { Image } from "@/components/server/Media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { getImageSrc } from "@/lib/utils";

interface DashbaordProductCardProps extends Product {
  collection: string;
  thumbnail: string;
}

export const DashbaordProductCard = async ({
  title,
  slug,
  price,
  state,
  discount,
  description,
  isReady,
  collection,
  thumbnail,
}: DashbaordProductCardProps) => {
  const src = getImageSrc({ collection, product: slug, name: thumbnail });

  if (isReady && src)
    return (
      <Card className="col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
        <CardHeader>
          <Image
            src={src}
            unoptimized
            alt="dummy_image"
            fill
            sizes="25vw"
            classNames={{ figure: "w-full aspect-video rounded-md" }}
          />
        </CardHeader>

        <CardContent>
          <CardTitle className="line-clamp-1 whitespace-nowrap text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="mb-2 line-clamp-3">{description}</CardDescription>
          <div className="ml-auto flex w-fit gap-2">
            <Badge
              variant={"secondary"}
              className="bg-sky-100 text-sky-900 hover:bg-sky-100/80 dark:bg-sky-800 dark:text-sky-50 dark:hover:bg-sky-800/80"
            >
              Sapphire
            </Badge>
            <Badge
              variant={"secondary"}
              className="bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80"
            >
              {state} Origin
            </Badge>
          </div>
        </CardContent>

        <CardFooter className={cn("flex-1 justify-end", { "justify-between": !!discount })}>
          {!!discount && (
            <Badge variant={"outline"} className="border-rose-200 text-rose-500">
              {discount}% OFF
            </Badge>
          )}
          <div className="flex flex-col">
            {!!discount && (
              <CardDescription className="w-full text-right font-semibold line-through">
                Rp. {formatPrice(price)}
              </CardDescription>
            )}
            <CardTitle className="w-full text-right font-semibold">
              Rp. {formatPrice(countDiscount(price, discount ?? 0))}
            </CardTitle>
          </div>
        </CardFooter>

        <CardFooter className="mt-auto gap-4">
          <Button className="flex-1">
            <Archive />
            Archive
          </Button>
          <Button className="flex-1">
            <Pencil />
            Edit
          </Button>
        </CardFooter>
      </Card>
    );
};

interface CatalogProductCardProps extends Pick<Product, "title" | "slug" | "description" | "price" | "discount"> {
  category: string;
  src: string;
}

export const CatalogProductCard = ({
  title,
  slug,
  description,
  category,
  price,
  discount,
  src,
}: CatalogProductCardProps) => {
  return (
    <Link
      href={`/products/${slug}`}
      draggable={false}
      className="group flex select-none flex-col rounded-md p-4 transition-shadow duration-300 card-shadow"
    >
      <Image
        src={src}
        alt={slug}
        fill
        sizes="25vw"
        classNames={{
          figure: "w-full aspect-[4/3] rounded overflow-hidden transition-all",
          image: "group-hover:scale-110 transition-transform duration-500",
        }}
      />

      <blockquote className="mt-4">
        <h5 className="mb-2 line-clamp-1 flex select-none items-center justify-between text-lg font-semibold text-slate-800">
          <span>{title}</span>
          <Badge variant="outline" className="border-sky-200 text-sky-400 focus:ring-sky-400">
            {category}
          </Badge>
        </h5>
        <p className="mb-4 line-clamp-2 select-none text-sm text-slate-500">{description}</p>

        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="bg-rose-100 text-rose-400 hover:bg-rose-100/80 dark:bg-rose-800 dark:text-rose-50 dark:hover:bg-rose-800/80"
          >
            %{discount} OFF!
          </Badge>
          <div>
            {discount && (
              <p className="select-none text-right text-xs text-rose-400 line-through">{formatPrice(price)}</p>
            )}
            <p className="select-none text-right text-base font-semibold">
              Rp {formatPrice(countDiscount(price, discount ?? 0))}
            </p>
          </div>
        </div>
      </blockquote>
    </Link>
  );
};
