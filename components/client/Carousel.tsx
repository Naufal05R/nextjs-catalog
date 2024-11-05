"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Fade from "embla-carousel-fade";
import Mapper from "@/components/server/Mapper";
import { Image } from "@/components/server/Media";
import { cn, formatPrice } from "@/lib/utils";
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
import { Collection, Media, Product } from "@prisma/client";
import { getImageSrc } from "@/lib/actions/image.action";

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
      classNames={{ dotsWrapper: "-mt-8", dotsContainer: "justify-center", dots: "basis-3 border-2" }}
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
                  sizes="25vw"
                  classNames={{
                    figure: "h-96 w-full rounded overflow-hidden transition-all",
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

export const CarouselFeatured = ({ data }: { data: Array<Product> }) => {
  return (
    <Carousel
      data={data}
      opts={{ align: "start", breakpoints: {} }}
      showControllers
      slides={
        <Mapper
          data={data}
          render={({ title, price, slug }) => (
            <CarouselItem responsiveArgs={["sm:basis-1/2", "md:basis-1/3", "xl:basis-1/4"]}>
              <Link href={`/products/${slug}`} draggable={false} className="select-none">
                <Image
                  src={`/dummy_1.jpg`}
                  alt="dummy_image"
                  fill
                  sizes="25vw"
                  classNames={{
                    figure: "w-full aspect-square rounded overflow-hidden transition-all",
                  }}
                />

                <blockquote className="mt-4">
                  <h5 className="select-none text-sm text-slate-800">{title}</h5>
                  <p className="select-none text-sm text-slate-500">Rp {formatPrice(price)}</p>
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
      data={sources}
      plugins={["fade"]}
      showDots
      slides={
        <Mapper
          data={sources}
          render={(src, i) => (
            <CarouselItem>
              <Image
                src={src}
                alt={`product_${i}`}
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
          data={sources}
          render={(src, index) => (
            <CarouselDot index={index} className={cn("aspect-square basis-9 border text-xl", classNames?.dots)}>
              <Image
                src={src}
                alt={`product_${index}`}
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
