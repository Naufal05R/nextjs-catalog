"use client";

import React from "react";
import Image from "../Image";
import Fade from "embla-carousel-fade";
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
import Mapper from "../Mapper";
import { Dataset } from "@/types/data";
import { ResponsiveArgs } from "@/types/carousel";
import Link from "next/link";
import { Product } from "@prisma/client";

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
    dotsContainer?: string;
    dots?: string;
  };
}

export const Carousel = <T extends Dataset>({
  data,
  slides,
  dotsElement,
  opts,
  plugins: _plugins,

  classNames,
  showControllers,
  showDots,
}: CarouselProps<T>) => {
  const { root, dots, dotsContainer } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot slides={data} className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <CarouselContent classNames={{ outer: "", inner: "h-full" }}>{slides}</CarouselContent>
      {showControllers && (
        <>
          <CarouselPrevious className="max-sm:hidden" />
          <CarouselNext className="max-sm:hidden" />
        </>
      )}

      {showDots && <CarouselDots el={dotsElement} classNames={{ wrapper: dotsContainer, dots }} />}
    </CarouselRoot>
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
            <CarouselItem
              classNames={{ outer: cn() }}
              responsiveArgs={["sm:basis-1/2", "md:basis-1/3", "xl:basis-1/4"]}
            >
              <div className="h-full">
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
              </div>
            </CarouselItem>
          )}
        />
      }
    />
  );
};
