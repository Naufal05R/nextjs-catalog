"use client";

import React from "react";
import Image from "../Image";
import Fade from "embla-carousel-fade";
import { EmblaPluginType, EmblaOptionsType } from "embla-carousel";
import { Carousel as CarouselRoot, CarouselContent, CarouselItem, CarouselDot } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselProps<T extends Array<{ [key: string]: unknown }>> {
  data: T;
  el?: React.JSX.Element;
  classNames?: {
    root?: string;
  };
  opts?: EmblaOptionsType;
  plugins?: Array<"fade">;
}

export function CarouselDemo<T extends Array<{ [key: string]: unknown }>>({
  data,
  el,
  opts,
  plugins: _plugins,
  classNames,
}: CarouselProps<T>) {
  const { root } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <CarouselContent classNames={{ outer: "h-full", inner: "h-full" }}>
        {data.map((_, index) => (
          <CarouselItem key={index}>
            <div className="h-full">
              {el ? (
                el
              ) : (
                <Image
                  src={`/dummy_${(index % 3) + 1}.jpg`}
                  alt="dummy_1"
                  fill
                  classNames={{ figure: "h-96 rounded w-full", image: "select-none" }}
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <ul className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-x-2.5">
        {data.map((_, index) => (
          <CarouselDot key={index} index={index} />
        ))}
      </ul>
    </CarouselRoot>
  );
}
