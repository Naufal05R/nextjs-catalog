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

interface ControllerProps {
  direction: "left" | "right";
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Controller = ({ direction, button }: ControllerProps) => {
  return (
    <div
      className={cn("absolute top-0 z-10 flex aspect-square min-w-[calc(25%-12px)] items-center", {
        "-right-8 justify-end": direction === "right",
        "-left-8 justify-start": direction === "left",
      })}
    >
      <button
        {...button}
        className={cn(
          "h-full w-fit rounded-full bg-transparent text-slate-500 opacity-100 transition-opacity duration-300 disabled:opacity-0",
          button?.className,
        )}
      >
        {direction === "left" ? <ChevronLeft size={32} strokeWidth={1} /> : <ChevronRight size={32} strokeWidth={1} />}
      </button>
    </div>
  );
};

const Carousel = () => {
  const [count, setCount] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const containerRef = React.useRef<HTMLUListElement>(null);

  const length = 8 as const;
  const display = 4 as const;
  const min = 0 as const;

  useEffect(() => {
    const onMouseMoveHandler = (e: MouseEvent) => {
      const inner = containerRef.current;
      if (!isDragging || !inner) return;

      e.preventDefault();

      const walk = e.pageX - startX;

      inner.style.transitionDuration = "0ms";
      inner.style.transform = `translateX(${walk}px)`;
    };

    const onMouseUpHandler = (e: MouseEvent) => {
      const inner = containerRef.current;
      if (!isDragging || !inner) return;

      setIsDragging(false);

      const walk = e.pageX - startX;
      const slideWidth = inner.offsetWidth / 4;
      const firstCondition = Math.abs(walk) > slideWidth / 2;
      const secondCondition = walk !== Math.abs(walk);
      const currentIndex = secondCondition ? getRangeItems(Math.round(Math.abs(walk) / slideWidth)) : 0;

      inner.style.transitionDuration = "300ms";
      inner.style.transform = `translateX(calc(calc(-25% - 4px) * ${firstCondition && secondCondition ? currentIndex : 0}))`;

      const gap = 16 / 4;
      const totalGap = currentIndex * gap;

      setCount(currentIndex);
      setStartX(currentIndex * slideWidth + totalGap);
    };

    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);

    return () => {
      document.removeEventListener("mousemove", onMouseMoveHandler);
      document.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [isDragging, startX, count]);

  const getRangeItems = (value: number) => {
    return Math.min(Math.max(0, value), length - display);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    setIsDragging(true);
    setStartX(e.pageX + startX);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (!isDragging) return;
    e.preventDefault();

    const walk = e.pageX - startX;

    e.currentTarget.style.transitionDuration = "0ms";
    e.currentTarget.style.transform = `translateX(${walk}px)`;
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    setIsDragging(false);

    const walk = e.pageX - startX;
    const slideWidth = e.currentTarget.offsetWidth / 4;
    const firstCondition = Math.abs(walk) > slideWidth / 2;
    const secondCondition = walk !== Math.abs(walk);
    const currentIndex = secondCondition ? getRangeItems(Math.round(Math.abs(walk) / slideWidth)) : 0;

    e.currentTarget.style.transitionDuration = "300ms";
    e.currentTarget.style.transform = `translateX(calc(calc(-25% - 4px) * ${firstCondition && secondCondition ? currentIndex : 0}))`;

    const gap = 16 / 4;
    const totalGap = currentIndex * gap;

    setCount(currentIndex);
    setStartX(currentIndex * slideWidth + totalGap);
  };

  const handleSlideChange = (updatedCount: typeof count) => {
    const inner = containerRef.current;
    if (!inner) return;

    const slideWidth = inner.offsetWidth / 4;
    const gap = 16 / 4;
    const totalGap = updatedCount * gap;

    inner.style.transitionDuration = "300ms";
    inner.style.transform = `translateX(calc(calc(-25% - 4px) * ${updatedCount}))`;

    setCount(getRangeItems(updatedCount));
    setStartX(updatedCount * slideWidth + totalGap);
  };

  if (!containerRef) return;

  return (
    <article className="relative w-full">
      <Controller
        direction="left"
        button={{
          onClick: () => handleSlideChange(count - 1),
          disabled: count <= min,
        }}
      />

      <Controller
        direction="right"
        button={{
          onClick: () => handleSlideChange(count + 1),
          disabled: count >= length - display,
        }}
      />

      <fieldset className="max-w-full overflow-hidden no-scrollbar">
        <ul
          ref={containerRef}
          className="relative z-20 flex max-w-full snap-start flex-row items-center gap-4 transition-transform duration-500"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {products.slice(0, length).map((product, collectionIndex) => (
            <Product key={collectionIndex} {...product} classNames={{ wrapper: "min-w-[calc(25%-12px)]" }} />
          ))}
        </ul>
      </fieldset>
    </article>
  );
};

export default Carousel;

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
