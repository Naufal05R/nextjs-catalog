"use client";

import React, { useState } from "react";
import Image from "./Image";

const Carousel = () => {
  const [count, setCount] = useState(1);

  return (
    <article className="max-w-full overflow-scroll no-scrollbar" onClick={() => setCount(count + 1)}>
      <ul
        style={{ transform: `translateX(calc(calc(-25% - 4px) * ${count}))` }}
        className="relative flex max-w-full flex-row items-center gap-4"
      >
        {Array.from({ length: 8 }).map((_, collectionIndex) => (
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
    </article>
  );
};

export default Carousel;
