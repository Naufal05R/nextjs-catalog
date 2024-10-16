"use client";

import React, { useState } from "react";
import Image from "./Image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControllerProps {
  direction: "left" | "right";
  wrapper?: React.HTMLAttributes<HTMLDivElement>;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Controller = ({ direction, wrapper, button }: ControllerProps) => {
  return (
    <div
      {...wrapper}
      className={cn(
        "absolute top-0 z-10 flex aspect-square min-w-[calc(25%-12px)] items-center",
        {
          "-right-8 justify-end": direction === "right",
          "-left-8 justify-start": direction === "left",
        },
        wrapper?.className,
      )}
    >
      <button
        {...button}
        className={cn("size-fit rounded-full bg-transparent text-slate-500 disabled:opacity-50", button?.className)}
      >
        {direction === "left" ? <ChevronLeft size={32} strokeWidth={1} /> : <ChevronRight size={32} strokeWidth={1} />}
      </button>
    </div>
  );
};

const Carousel = () => {
  const [count, setCount] = useState(0);

  const length = 8;

  const min = 0;
  const max = length - 4;

  return (
    <article className="relative w-full">
      <Controller
        direction="left"
        wrapper={{
          hidden: count === min,
          className: cn({
            hidden: count === min,
          }),
        }}
        button={{
          onClick: () => setCount(Math.max(min, count - 1)),
          disabled: count === min,
          hidden: count === min,
        }}
      />

      <Controller
        direction="right"
        wrapper={{
          hidden: count === max,
          className: cn({
            hidden: count === max,
          }),
        }}
        button={{
          onClick: () => setCount(Math.min(max, count + 1)),
          disabled: count === max,
          hidden: count === max,
        }}
      />

      <fieldset className="max-w-full overflow-scroll no-scrollbar">
        <ul
          style={{ transform: `translateX(calc(calc(-25% - 4px) * ${count}))` }}
          className="relative flex max-w-full flex-row items-center gap-4 transition-transform duration-500"
        >
          {Array.from({ length }).map((_, collectionIndex) => (
            <li key={collectionIndex} className="min-w-[calc(25%-12px)]">
              <Image
                src={`/dummy_${(collectionIndex % 3) + 1}.jpg`}
                alt={`dummy_${(collectionIndex % 3) + 1}`}
                fill
                classNames={{
                  figure: "w-full aspect-square rounded overflow-hidden",
                }}
              />

              {/* <div className="grid aspect-square w-full place-items-center overflow-hidden rounded text-8xl font-bold">
                  {collectionIndex + 1}
                </div> */}

              <p className="mt-4 text-sm text-slate-400">Rp 19,99</p>
              <p className="mt-0 text-sm text-slate-500">Example Product Title</p>
            </li>
          ))}
        </ul>
      </fieldset>
    </article>
  );
};

export default Carousel;
