"use client";

import React from "react";
import Link from "next/link";
import Fade from "embla-carousel-fade";
import Mapper from "@/components/server/Mapper";

import { cn, getFileDetails } from "@/lib/utils";
import { Media as MediaComponent } from "@/components/server/Media";
import { EmblaOptionsType } from "embla-carousel";
import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselPrevious,
  CarouselNext,
  CarouselDot,
} from "@/components/ui/carousel";
import { Dataset } from "@/types/data";
import { ResponsiveArgs } from "@/types/carousel";
import { Media } from "@prisma/client";
import { getMediaSrc } from "@/lib/utils";
import { getAllProduct } from "@/lib/actions/product.action";
import { CatalogProductCard } from "@/components/server/Product";

interface CarouselProps<T extends Dataset> {
  data: T;
  controllersElement?: {
    prev: React.JSX.Element;
    next: React.JSX.Element;
  };
  placement?: "inside" | "outside";
  slidesElement: React.JSX.Element;
  dotsElement?: React.JSX.Element;
  opts?: EmblaOptionsType;
  plugins?: Array<"fade">;
  showDots?: boolean;
  showControllers?: boolean;
  responsiveArgs?: ResponsiveArgs;
  classNames?: {
    root?: string;
    wrapper?: string;
    controllerPrev?: string;
    controllerNext?: string;
    dotsWrapper?: string;
    dotsContainer?: string;
    dots?: string;
  };
}

const Carousel = <T extends Dataset>({
  data,
  controllersElement,
  slidesElement,
  dotsElement,
  placement,
  opts,
  plugins: _plugins,

  classNames,
  showControllers,
  showDots,
}: CarouselProps<T>) => {
  const { root, wrapper, dots, dotsContainer, dotsWrapper } = classNames ?? {};

  const plugins = _plugins?.includes("fade") ? [Fade()] : [];

  return (
    <CarouselRoot slides={data} className={cn("w-full", root)} opts={opts} plugins={plugins}>
      <div className={cn("relative", wrapper)}>
        <CarouselContent>{slidesElement}</CarouselContent>
        {showControllers && (
          <>
            <CarouselPrevious
              controller={controllersElement?.prev}
              className={cn(
                "max-sm:hidden",
                { "bg-slate-50/25 backdrop-blur": placement === "inside" },
                classNames?.controllerPrev,
              )}
              placement={placement}
            />
            <CarouselNext
              controller={controllersElement?.next}
              className={cn(
                "max-sm:hidden",
                { "bg-slate-50/25 backdrop-blur": placement === "inside" },
                classNames?.controllerNext,
              )}
              placement={placement}
            />
          </>
        )}
      </div>
      {showDots && (
        <CarouselDots dots={dotsElement} classNames={{ wrapper: dotsWrapper, container: dotsContainer, dots }} />
      )}
    </CarouselRoot>
  );
};

export const CarouselThumbnail = ({ data }: { data: NonNullable<Awaited<ReturnType<typeof getAllProduct>>> }) => {
  return (
    <Carousel
      data={data}
      opts={{ align: "start", loop: true }}
      plugins={["fade"]}
      showDots
      classNames={{
        dotsWrapper: "-mt-8",
        dotsContainer: "justify-center",
        dots: "basis-3 border-2",
        root: "aspect-video flex-1 max-md:aspect-video max-lg:aspect-[34/13]",
      }}
      slidesElement={
        <Mapper
          data={data}
          render={({ id, description, slug, gallery, collection }) => {
            const src = getMediaSrc({
              productId: id,
              collection: collection.slug,
              name: gallery!.medias[0].name,
            });
            const { fileExt } = getFileDetails(src);

            return (
              <CarouselItem>
                <Link
                  href={`/products/${slug}`}
                  draggable={false}
                  className="relative flex select-none flex-col items-center"
                >
                  <MediaComponent
                    fileExt={fileExt}
                    imageProps={{
                      src,
                      alt: slug,
                      fill: true,
                      filter: true,
                      sizes: "(max-width: 1024px) 75vw, 100vw",
                      classNames: {
                        figure:
                          "aspect-video w-full rounded overflow-hidden transition-all max-md:aspect-video max-lg:aspect-[34/13]",
                      },
                    }}
                    videoProps={{
                      src: `${src}#t=0.1`,
                      filter: true,
                      autoPlay: false,
                      controls: false,
                      classNames: {
                        figure:
                          "aspect-video w-full rounded overflow-hidden transition-all max-md:aspect-video max-lg:aspect-[34/13]",
                      },
                    }}
                  />

                  <h4 className="absolute bottom-16 z-20 line-clamp-2 max-w-[80%] text-center text-xl text-slate-50">
                    {description}
                  </h4>
                </Link>
              </CarouselItem>
            );
          }}
        />
      }
      dotsElement={
        <Mapper
          data={data}
          render={(_, index) => (
            <CarouselDot index={index} className={cn("aspect-square basis-3 rounded-full border-2 text-xl")} />
          )}
        />
      }
    />
  );
};

export const CarouselFeatured = ({ data }: { data: NonNullable<Awaited<ReturnType<typeof getAllProduct>>> }) => {
  return (
    <Carousel
      data={data}
      opts={{ align: "start", breakpoints: {} }}
      showControllers
      slidesElement={
        <Mapper
          data={data}
          render={({ category, gallery, collection, ...product }) => (
            <CarouselItem responsiveArgs={["xs:basis-1/2", "md:basis-1/3", "xl:basis-1/4"]}>
              <CatalogProductCard
                {...product}
                category={category.title}
                imageProps={{
                  src: getMediaSrc({
                    productId: product.id,
                    collection: collection.slug,
                    name: gallery!.medias[0].name,
                  }),
                }}
              />
            </CarouselItem>
          )}
        />
      }
    />
  );
};

export const CarouselDetail = ({
  data,
  productId,
  collection,
  classNames,
}: {
  data: Array<Media>;
  productId: string;
  collection: string;
  classNames?: Pick<CarouselProps<Dataset>, "classNames">["classNames"];
}) => {
  return (
    <Carousel
      data={data}
      plugins={["fade"]}
      showDots
      placement="inside"
      showControllers
      slidesElement={
        <Mapper
          data={data}
          render={({ title, slug, name }) => {
            const src = getMediaSrc({ productId, collection, name });
            const { fileExt } = getFileDetails(src);

            return (
              <CarouselItem>
                <MediaComponent
                  fileExt={fileExt}
                  imageProps={{
                    src,
                    title,
                    alt: slug,
                    fill: true,
                    sizes: "(max-width: 1024px) 25vw, 50vw",
                    classNames: {
                      figure: "aspect-square rounded w-full",
                    },
                  }}
                  videoProps={{
                    src,
                    title,
                    autoPlay: true,
                    controls: true,
                    loop: true,
                    classNames: {
                      figure: "aspect-square rounded w-full",
                    },
                  }}
                />
              </CarouselItem>
            );
          }}
        />
      }
      dotsElement={
        <Mapper
          data={data}
          render={({ title, slug, name }, index) => {
            const src = getMediaSrc({ productId, collection, name });
            const { fileExt } = getFileDetails(src);

            return (
              <CarouselDot index={index} className={cn("aspect-square basis-9 border text-xl", classNames?.dots)}>
                <MediaComponent
                  fileExt={fileExt}
                  imageProps={{
                    src,
                    title,
                    alt: slug,
                    fill: true,
                    sizes: "10vw",
                    classNames: {
                      figure: "aspect-square rounded w-full",
                    },
                  }}
                  videoProps={{
                    src: `${src}#t=0.1`,
                    title,
                    autoPlay: false,
                    controls: false,
                    classNames: {
                      figure: "aspect-square rounded w-full",
                    },
                  }}
                />
              </CarouselDot>
            );
          }}
        />
      }
      classNames={{
        controllerPrev: "max-sm:flex",
        controllerNext: "max-sm:flex",
        ...classNames,
      }}
    />
  );
};
