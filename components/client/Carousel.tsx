"use client";

import React from "react";
import Image from "../Image";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";
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

interface CarouselProps<T extends Dataset> {
  data: T;
  el?: React.JSX.Element;
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

export function Carousel<T extends Dataset>({
  data,
  el,
  opts,
  plugins: _plugins,
  responsiveArgs,
  classNames,
  showControllers,
  showDots,
}: CarouselProps<T>) {
  const { root, dots, dotsContainer } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot slides={data} className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <CarouselContent classNames={{ outer: "", inner: "h-full" }}>
        <Mapper
          data={data}
          render={(_, i) => (
            <CarouselItem classNames={{ outer: cn() }} responsiveArgs={responsiveArgs}>
              <div className="h-full">
                <Image
                  src={`/dummy_${(i % 3) + 1}.jpg`}
                  classNames={{ figure: "h-96 rounded w-full" }}
                  alt="dummy_1"
                  fill
                />
              </div>
            </CarouselItem>
          )}
        />
      </CarouselContent>
      {showControllers && (
        <>
          <CarouselPrevious className="max-sm:hidden" />
          <CarouselNext className="max-sm:hidden" />
        </>
      )}

      {showDots && <CarouselDots el={el} classNames={{ wrapper: dotsContainer, dots }} />}
    </CarouselRoot>
  );
}
