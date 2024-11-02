import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Bag } from "../svg";

interface ComponentBaseProps {
  type: string;
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

interface StrictComponentProps extends ComponentBaseProps {
  strict: true;
  type: "image/" | "video/";
}

interface FlexibleComponentProps extends ComponentBaseProps {
  strict?: false;
  type: string;
}

type ImageProps = Omit<React.ComponentProps<typeof NextImage>, "className">;
type VideoProps = Omit<
  React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  "className"
>;
type MediaProps = ComponentBaseProps & (ImageProps | VideoProps);

const Media = ({ FallbackComponent = Bag, classNames, ...props }: MediaProps) => {
  const { figure, media, fallback } = classNames ?? {};
  const { type, src } = props;

  return (
    <figure className={cn("relative overflow-hidden", figure)}>
      {type.startsWith("image/") && src && (
        <NextImage
          {...(props as ImageProps)}
          draggable={false}
          className={cn("z-20 size-full object-cover object-center before:hidden", media)}
        />
      )}
      {type.startsWith("video/") && (
        <video {...(props as VideoProps)} className={cn("z-20 size-full object-cover object-center", media)} />
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
