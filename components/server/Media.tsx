import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Bag } from "../svg";
import { getDynamicBlurDataUrl } from "@/lib/actions/image.action";

interface ComponentBaseProps {
  FallbackComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
  classNames?: {
    figure?: string;
    fallback?: {
      wrapper?: string;
      icon?: string;
    };
  };
}

interface ImageComponentProps extends ImageProps, Pick<ComponentBaseProps, "FallbackComponent"> {
  classNames?: ComponentBaseProps["classNames"] & {
    image?: string;
  };
}

interface VideoComponentProps extends VideoProps, Pick<ComponentBaseProps, "FallbackComponent"> {
  classNames?: ComponentBaseProps["classNames"] & {
    video?: string;
  };
}

type ImageProps = Omit<React.ComponentProps<typeof NextImage>, "className">;
type VideoProps = Omit<
  React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  "className"
>;

export const Media = ({ FallbackComponent = Bag, classNames, children }: ComponentBaseProps) => {
  const { figure, fallback } = classNames ?? {};

  return (
    <figure className={cn("relative overflow-hidden", figure)}>
      {children}
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

export const Image = ({ FallbackComponent = Bag, classNames, ...props }: ImageComponentProps) => {
  const { figure, image, fallback } = classNames ?? {};
  return (
    <Media classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      {props.src && (
        <NextImage
          {...props}
          draggable={false}
          className={cn("z-20 size-full object-cover object-center before:hidden", image)}
        />
      )}
    </Media>
  );
};

export const Video = ({ FallbackComponent = Bag, classNames, ...props }: VideoComponentProps) => {
  const { figure, video, fallback } = classNames ?? {};

  return (
    <Media classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      {props.src && <video {...props} className={cn("z-20 size-full object-cover object-center", video)} />}
    </Media>
  );
};
