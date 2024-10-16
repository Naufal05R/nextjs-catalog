import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Bag } from "./svg";

interface ImageProps extends Omit<React.ComponentProps<typeof NextImage>, "className"> {
  FallbackComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  classNames?: {
    figure?: string;
    image?: string;
    fallback?: {
      wrapper?: string;
      icon?: string;
    };
  };
}

const Image = ({ FallbackComponent = Bag, classNames, ...props }: ImageProps) => {
  const { figure, image, fallback } = classNames ?? {};

  return (
    <figure className={cn("relative overflow-hidden", figure)}>
      <NextImage
        {...props}
        draggable={false}
        className={cn("z-20 size-full object-cover object-center before:hidden", image)}
      />
      <div
        className={cn(
          "relative z-10 grid size-full place-items-center overflow-hidden bg-slate-300",
          fallback?.wrapper,
        )}
      >
        <FallbackComponent
          className={cn("absolute aspect-square max-h-full max-w-full text-slate-400", fallback?.icon)}
        />
      </div>
    </figure>
  );
};

export default Image;
