"use client";

import React, { useEffect, useState } from "react";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/constants";
import Product from "./Product";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDot,
} from "@/components/ui/carousel";
import Image from "../Image";

interface CarouselProps<T extends Array<{ [key: string]: unknown }>> {
  data: T;
  el?: React.JSX.Element;
  classNames?: {
    root?: string;
  };
}

export function CarouselDemo<T extends Array<{ [key: string]: unknown }>>({ data, el, classNames }: CarouselProps<T>) {
  const { root } = classNames ?? {};

  return (
    <CarouselRoot className={cn("w-full", root)} opts={{ loop: true }} plugins={[Fade({ active: true })]}>
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
