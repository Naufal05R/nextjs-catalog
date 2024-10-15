import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React from "react";

interface ImageProps extends Omit<React.ComponentProps<typeof NextImage>, "className"> {
  classNames?: {
    figure?: string;
    image?: string;
  };
}

const Image = ({ classNames, ...props }: ImageProps) => {
  const { figure, image } = classNames ?? {};

  return (
    <figure className={cn("relative", figure)}>
      <NextImage {...props} className={cn("size-full object-cover object-center", image)} />
    </figure>
  );
};

export default Image;
