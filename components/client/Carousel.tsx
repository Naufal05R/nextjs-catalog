"use client";

import React from "react";
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
} from "@/components/ui/carousel";
import { Dataset } from "@/types/data";
import { ResponsiveArgs } from "@/types/carousel";
import { Collection, Product } from "@prisma/client";

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
        <CarouselDots el={dotsElement} classNames={{ wrapper: dotsWrapper, container: dotsContainer, dots }} />
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
                  mimeType="image/jpg"
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
                  mimeType="image/jpg"
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
  classNames,
}: {
  data: Product;
  classNames?: Pick<CarouselProps<Dataset>, "classNames">["classNames"];
}) => {
  return (
    <Carousel
      data={[data, data, data, data, data]}
      plugins={["fade"]}
      showDots
      slides={
        <Mapper
          data={[data, data, data, data, data]}
          render={(_, i) => (
            <CarouselItem>
              <Image
                src={`/dummy_${(i % 3) + 1}.jpg`}
                alt={`dummy_${(i % 3) + 1}`}
                mimeType="image/jpg"
                fill
                sizes="50vw"
                classNames={{ figure: "aspect-square rounded w-full" }}
              />
            </CarouselItem>
          )}
        />
      }
      dotsElement={
        <Image
          src={"/dummy_1.jpg"}
          alt="dummy_1"
          mimeType="image/jpg"
          fill
          sizes="10vw"
          classNames={{ figure: "aspect-square rounded w-full" }}
        />
      }
      classNames={classNames}
    />
  );
};
