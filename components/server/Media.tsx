import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Bag } from "../svg";
import { ACCEPTED_IMAGE_MIME_EXTS, ACCEPTED_VIDEO_MIME_EXTS } from "@/schema/media";

interface ComponentBaseProps {
  FallbackComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  classNames?: {
    figure?: string;
    fallback?: {
      wrapper?: string;
      icon?: string;
    };
  };
}

interface ImageComponentProps<T extends (typeof ACCEPTED_IMAGE_MIME_EXTS)[number]>
  extends ImageProps,
    Pick<ComponentBaseProps, "FallbackComponent"> {
  mimeType: T | (string & {});
  classNames?: ComponentBaseProps["classNames"] & {
    image?: string;
  };
}

interface VideoComponentProps<T extends (typeof ACCEPTED_VIDEO_MIME_EXTS)[number]>
  extends VideoProps,
    Pick<ComponentBaseProps, "FallbackComponent"> {
  mimeType: T | (string & {});
  classNames?: ComponentBaseProps["classNames"] & {
    video?: string;
  };
}

type ImageProps = Omit<React.ComponentProps<typeof NextImage>, "className">;
type VideoProps = Omit<
  React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>,
  "className"
>;

const Media = ({ FallbackComponent = Bag, classNames, children }: ComponentBaseProps) => {
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

export const Image = <T extends (typeof ACCEPTED_IMAGE_MIME_EXTS)[number]>({
  FallbackComponent = Bag,
  classNames,
  ...props
}: ImageComponentProps<T>) => {
  const { figure, image, fallback } = classNames ?? {};

  return (
    <Media classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      <NextImage
        {...props}
        draggable={false}
        className={cn("z-20 size-full object-cover object-center before:hidden", image)}
      />
    </Media>
  );
};

export const Video = <T extends (typeof ACCEPTED_VIDEO_MIME_EXTS)[number]>({
  FallbackComponent = Bag,
  classNames,
  ...props
}: VideoComponentProps<T>) => {
  const { figure, video, fallback } = classNames ?? {};

  return (
    <Media classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      <video {...props} className={cn("z-20 size-full object-cover object-center", video)} />
    </Media>
  );
};
