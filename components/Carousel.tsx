"use client";

import React, { useState } from "react";
import Image from "./Image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
        className={cn("size-fit rounded-full bg-transparent text-slate-500 disabled:opacity-50", button?.className)}
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
  const [currentX, setCurrentX] = useState(0);

  const length = 8;

  const min = 0;
  const max = length - 4;

  return (
    <article className="relative w-full">
      <Controller
        direction="left"
        button={{
          onClick: () => setCount(Math.max(min, count - 1)),
          disabled: count === min,
          hidden: count === min,
        }}
      />

      <Controller
        direction="right"
        button={{
          onClick: () => setCount(Math.min(max, count + 1)),
          disabled: count === max,
          hidden: count === max,
        }}
      />

      <fieldset className="max-w-full overflow-hidden no-scrollbar">
        <ul
          style={{ transform: `translateX(calc(calc(-25% - 4px) * ${count}))` }}
          className="relative z-20 flex max-w-full snap-start flex-row items-center gap-4 transition-transform duration-500"
          onMouseDown={(e) => {
            setIsDragging(true);
            setStartX(e.pageX - e.currentTarget.offsetLeft);
            e.currentTarget.style.transitionDuration = "0ms";
            e.currentTarget.style.cursor = "grabbing";
          }}
          onMouseMove={(e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.pageX - e.currentTarget.offsetLeft;
            const walk = currentX - startX; // Calculate distance moved
            e.currentTarget.style.transitionDuration = "0ms";
            e.currentTarget.style.transform = `translateX(${walk}px)`;
          }}
          onMouseUp={(e) => {
            setIsDragging(false);
            setCurrentX(0);
            e.currentTarget.style.transitionDuration = "500ms";
            e.currentTarget.style.transform = `translateX(${0}px)`;
          }}
          onMouseLeave={(e) => {
            setIsDragging(false);
            e.currentTarget.style.cursor = "grab";
            e.currentTarget.style.transitionDuration = "500ms";
            e.currentTarget.style.transform = `translateX(${0}px)`;
          }}
        >
          {Array.from({ length }).map((_, collectionIndex) => (
            <li key={collectionIndex} className="min-w-[calc(25%-12px)] select-none">
              <Image
                src={`/dummy_${(collectionIndex % 3) + 1}.jpg`}
                alt={`dummy_${(collectionIndex % 3) + 1}`}
                sizes="25vw"
                fill
                classNames={{
                  figure: "w-full aspect-square rounded overflow-hidden",
                }}
              />

              {/* <div className="grid aspect-square w-full place-items-center overflow-hidden rounded text-8xl font-bold">
                  {collectionIndex + 1}
                </div> */}

              <p className="mt-4 select-none text-sm text-slate-400">Rp 19,99</p>
              <p className="mt-0 select-none text-sm text-slate-500">Example Product Title</p>
            </li>
          ))}
        </ul>
      </fieldset>
    </article>
  );
};

export default Carousel;
