"use client";

import React, { useState } from "react";
import Image from "./Image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = () => {
  const [count, setCount] = useState(0);

  const length = 8;

  return (
    <article className="relative w-full">
      <div className="absolute -left-8 top-0 z-10 flex aspect-square min-w-[calc(25%-12px)] items-center justify-start">
        <button className="size-fit rounded-full bg-transparent text-slate-500">
          <ChevronLeft
            size={32}
            strokeWidth={1}
            onClick={() => {
              setCount(count + 1);
            }}
          />
        </button>
      </div>

      <div className="absolute -right-8 top-0 z-10 flex aspect-square min-w-[calc(25%-12px)] items-center justify-end">
        <button className="size-fit rounded-full bg-transparent text-slate-500">
          <ChevronRight
            size={32}
            strokeWidth={1}
            onClick={() => {
              setCount(count - 1);
            }}
          />
        </button>
      </div>

      <fieldset className="max-w-full overflow-scroll no-scrollbar">
        <ul
          style={{ transform: `translateX(calc(calc(25% + 4px) * ${count}))` }}
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
