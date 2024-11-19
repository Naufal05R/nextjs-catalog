import React from "react";
import NextImage from "next/image";
import { cn, toBase64 } from "@/lib/utils";
import { Bag } from "../svg";
import { ACCEPTED_IMAGE_EXTS, ACCEPTED_MEDIA_TYPES, ACCEPTED_VIDEO_EXTS } from "@/schema/media";

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

interface MediaComponentProps {
  fileExt: (typeof ACCEPTED_MEDIA_TYPES)[number] | (string & {});
  imageProps?: ImageComponentProps;
  videoProps?: VideoComponentProps;
}

export interface ImageComponentProps
  extends Omit<React.ComponentProps<typeof NextImage>, "className">,
    Pick<ComponentBaseProps, "FallbackComponent"> {
  filter?: boolean;
  classNames?: ComponentBaseProps["classNames"] & {
    image?: string;
  };
}

export interface VideoComponentProps
  extends Omit<React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>, "className">,
    Pick<ComponentBaseProps, "FallbackComponent"> {
  filter?: boolean;
  classNames?: ComponentBaseProps["classNames"] & {
    video?: string;
  };
}

const shimmer = (width: number, height: number) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#94a3b8" offset="20%" />
      <stop stop-color="#64748b7f" offset="50%" />
      <stop stop-color="#94a3b8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#94a3b8" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const Figure = ({ FallbackComponent = Bag, classNames, children }: ComponentBaseProps) => {
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

export const Media = ({ fileExt, imageProps, videoProps }: MediaComponentProps) => {
  if (new Set<typeof fileExt>(ACCEPTED_IMAGE_EXTS).has(fileExt)) {
    return imageProps && <Image {...imageProps} />;
  }

  if (new Set<typeof fileExt>(ACCEPTED_VIDEO_EXTS).has(fileExt)) {
    return videoProps && <Video {...videoProps} />;
  }
};

export const Image = ({ FallbackComponent = Bag, classNames, filter = false, ...props }: ImageComponentProps) => {
  const { figure, image, fallback } = classNames ?? {};
  return (
    <Figure classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      {props.src && (
        <NextImage
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(10, 10))}`}
          {...props}
          draggable={false}
          className={cn("z-20 size-full object-cover object-center before:hidden", image)}
        />
      )}

      {filter && (
        <div className="absolute z-20 size-full bg-gradient-to-b from-neutral-800/0 via-neutral-800/0 to-neutral-800/90" />
      )}
    </Figure>
  );
};

export const Video = ({ FallbackComponent = Bag, filter, classNames, ...props }: VideoComponentProps) => {
  const { figure, video, fallback } = classNames ?? {};

  return (
    <Figure classNames={{ figure, fallback }} FallbackComponent={FallbackComponent}>
      {props.src && <video {...props} className={cn("z-20 size-full object-cover object-center", video)} />}

      {filter && (
        <div className="absolute z-20 size-full bg-gradient-to-b from-neutral-800/0 via-neutral-800/0 to-neutral-800/90" />
      )}
    </Figure>
  );
};
