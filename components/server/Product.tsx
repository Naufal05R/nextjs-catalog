import React from "react";
import { Archive, Pencil } from "lucide-react";


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { Image } from "@/components/server/Media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { getImageSrc } from "@/lib/actions/image.action";

interface DashbaordProductCardProps extends Product {
  collection: string;
  thumbnail: string;
}

export const DashbaordProductCard = async ({
  title,
  price,
  state,
  discount,
  description,
  isReady,
  collection,
  thumbnail,
}: DashbaordProductCardProps) => {
  const src = await getImageSrc({ collection, name: thumbnail });

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
              Rp. {formatPrice(price * (1 - Math.min(Math.abs(discount ?? 0), 100) / 100))}
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
