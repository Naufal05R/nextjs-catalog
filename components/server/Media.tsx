import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Bag } from "../svg";

interface ImageProps extends Omit<React.ComponentProps<typeof NextImage>, "className"> {
  type: `image${string}`;
}
interface VideoProps
  extends Omit<React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, "className"> {
  type: `video${string}`;
}

interface ComponentProps {
  FallbackComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  classNames?: {
    figure?: string;
    media?: string;
    fallback?: {
      wrapper?: string;
      icon?: string;
    };
  };
}

type MediaProps<T extends string> = ComponentProps &
  (T extends `image${string}` ? ImageProps : T extends `video${string}` ? VideoProps : never);

const Media = <T extends string>({ FallbackComponent = Bag, classNames, ...props }: MediaProps<T>) => {
  const { figure, media: image, fallback } = classNames ?? {};
  const { type, src } = props;

  return (
    <figure className={cn("relative overflow-hidden", figure)}>
      {type.startsWith("image") && src && (
        <NextImage
          {...(props as unknown as ImageProps)}
          draggable={false}
          className={cn("z-20 size-full object-cover object-center before:hidden", image)}
        />
      )}
      {type.startsWith("video") && (
        <video {...(props as VideoProps)} className={cn("z-20 size-full object-cover object-center", image)} />
      )}
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

export default Media;
