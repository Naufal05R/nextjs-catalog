"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Fade from "embla-carousel-fade";
import Mapper from "@/components/server/Mapper";
import { Image } from "@/components/server/Media";
import { cn, countDiscount, formatPrice } from "@/lib/utils";
import { EmblaOptionsType } from "embla-carousel";
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselPrevious,
  CarouselNext,
  CarouselDot,
} from "@/components/ui/carousel";
import { Dataset } from "@/types/data";
import { ResponsiveArgs } from "@/types/carousel";
import { Collection, Media } from "@prisma/client";
import { getImageSrc } from "@/lib/actions/image.action";
import { getAllProduct } from "@/lib/actions/product.action";
import { Badge } from "../ui/badge";

interface CarouselProps<T extends Dataset> {
  data: T;
  slides: React.JSX.Element;
  dotsElement?: React.JSX.Element;
  opts?: EmblaOptionsType;
  plugins?: Array<"fade">;
  showDots?: boolean;
  showControllers?: boolean;
  responsiveArgs?: ResponsiveArgs;
  classNames?: {
    root?: string;
    dotsWrapper?: string;
    dotsContainer?: string;
    dots?: string;
  };
}

const Carousel = <T extends Dataset>({
  data,
  slides,
  dotsElement,
  opts,
  plugins: _plugins,

  classNames,
  showControllers,
  showDots,
}: CarouselProps<T>) => {
  const { root, dots, dotsContainer, dotsWrapper } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot slides={data} className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <CarouselContent>{slides}</CarouselContent>
      {showControllers && (
        <>
          <CarouselPrevious className="max-sm:hidden" />
          <CarouselNext className="max-sm:hidden" />
        </>
      )}

      {showDots && (
        <CarouselDots dots={dotsElement} classNames={{ wrapper: dotsWrapper, container: dotsContainer, dots }} />
      )}
    </CarouselRoot>
  );
};

export const CarouselThumbnail = ({ data }: { data: Array<Collection> }) => {
  return (
    <Carousel
      data={data}
      opts={{ align: "start", loop: true }}
      plugins={["fade"]}
      showDots
      classNames={{
        dotsWrapper: "-mt-8",
        dotsContainer: "justify-center",
        dots: "basis-3 border-2",
        root: "aspect-video flex-1 max-md:aspect-video max-lg:aspect-[34/13]",
      }}
      slides={
        <Mapper
          data={data}
          render={({ slug }, i) => (
            <CarouselItem>
              <Link href={`/collections/${slug}`} draggable={false} className="select-none">
                <Image
                  src={`/dummy_${(i % 3) + 1}.jpg`}
                  alt="dummy_image"
                  fill
                  sizes="(max-width: 1024px) 75vw, 100vw"
                  classNames={{
                    figure:
                      "aspect-video rounded overflow-hidden transition-all max-md:aspect-video max-lg:aspect-[34/13]",
                  }}
                />
              </Link>
            </CarouselItem>
          )}
        />
      }
    />
  );
};

export const CarouselFeatured = ({ data }: { data: NonNullable<Awaited<ReturnType<typeof getAllProduct>>> }) => {
  const [sources, setSources] = useState<Array<string>>([]);

  useEffect(() => {
    return () => {
      (async () => {
        for (const { slug, gallery, collection } of data) {
          if (gallery) {
            const { medias } = gallery;

            const src = await getImageSrc({ product: slug, collection: collection.slug, name: medias[0].name });

            if (src) {
              setSources((prev) => [...prev, src]);
            }
          }
        }
      })();
    };
  }, [data]);

  return (
    <Carousel
      data={data}
      opts={{ align: "start", breakpoints: {} }}
      showControllers
      slides={
        <Mapper
          data={data}
          render={({ title, price, slug, description, discount, category }, index) => (
            <CarouselItem responsiveArgs={["xs:basis-1/2", "md:basis-1/3", "xl:basis-1/4"]}>
              <Link
                href={`/products/${slug}`}
                draggable={false}
                className="group flex select-none flex-col rounded-md p-4 card-shadow"
              >
                <Image
                  src={sources[index]}
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
                      {category.title}
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
                        <p className="select-none text-right text-xs text-rose-400 line-through">
                          {formatPrice(price)}
                        </p>
                      )}
                      <p className="select-none text-right text-base font-semibold">
                        Rp {formatPrice(countDiscount(price, discount ?? 0))}
                      </p>
                    </div>
                  </div>
                </blockquote>
              </Link>
            </CarouselItem>
          )}
        />
      }
    />
  );
};

export const CarouselDetail = ({
  data,
  product,
  collection,
  classNames,
}: {
  data: Array<Media>;
  product: string;
  collection: string;
  classNames?: Pick<CarouselProps<Dataset>, "classNames">["classNames"];
}) => {
  const [sources, setSources] = useState<Array<string>>([]);

  useEffect(() => {
    return () => {
      (async () => {
        for (const { name } of data) {
          const src = await getImageSrc({ product, collection, name });

          if (src) {
            setSources((prev) => [...prev, src]);
          }
        }
      })();
    };
  }, [data, collection, product]);

  return (
    <Carousel
      data={data}
      plugins={["fade"]}
      showDots
      slides={
        <Mapper
          data={data}
          render={({ title }, index) => (
            <CarouselItem>
              <Image
                src={sources[index]}
                alt={title}
                fill
                sizes="50vw"
                classNames={{ figure: "aspect-square rounded w-full" }}
              />
            </CarouselItem>
          )}
        />
      }
      dotsElement={
        <Mapper
          data={data}
          render={({ title }, index) => (
            <CarouselDot index={index} className={cn("aspect-square basis-9 border text-xl", classNames?.dots)}>
              <Image
                src={sources[index]}
                alt={title}
                fill
                sizes="10vw"
                classNames={{ figure: "aspect-square rounded w-full" }}
              />
            </CarouselDot>
          )}
        />
      }
      classNames={classNames}
    />
  );
};
