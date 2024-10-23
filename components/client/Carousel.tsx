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

type ScreensSizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvailableSlidesPerView = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "1" | "2" | "3" | "4" | "5" | "6" | "12";

interface CarouselProps<T extends Dataset> {
  data: T;
  el?: React.JSX.Element;
  opts?: EmblaOptionsType;
  plugins?: Array<"fade">;
  showDots?: boolean;
  showControllers?: boolean;
  slidesPerView?: {
    [key in ScreensSizes]?: AvailableSlidesPerView;
  };
  classNames?: {
    root?: string;
  };
}

export function Carousel<T extends Dataset>({
  data,
  el,
  opts,
  plugins: _plugins,
  slidesPerView: _slidesPerView,
  classNames,
  showControllers,
  showDots,
}: CarouselProps<T>) {
  const { root } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <CarouselContent classNames={{ outer: "h-full", inner: "h-full" }}>
        <Mapper
          data={data}
          render={(_, i) => (
            <CarouselItem classNames={{ outer: cn() }} slidesPerView={_slidesPerView}>
              <div className="h-full">
                {el ? (
                  el
                ) : (
                  <Image
                    src={`/dummy_${(i % 3) + 1}.jpg`}
                    alt="dummy_1"
                    fill
                    classNames={{ figure: "h-96 rounded w-full" }}
                  />
                )}
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

      {showDots && <CarouselDots data={data} />}
    </CarouselRoot>
  );
}
