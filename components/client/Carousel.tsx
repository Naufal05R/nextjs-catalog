"use client";

import React from "react";
import Link from "next/link";
import Fade from "embla-carousel-fade";
import Mapper from "@/components/server/Mapper";

import { cn } from "@/lib/utils";
import { Image } from "@/components/server/Media";
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
import { Media, Product } from "@prisma/client";
import { getImageSrc } from "@/lib/utils";
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

export const CarouselThumbnail = ({ data }: { data: Array<Product> }) => {
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
          render={(_, i) => (
            <CarouselItem>
              <Link href={`/`} draggable={false} className="select-none">
                <Image
                  src={`/dummy_${(i % 3) + 1}.jpg`}
                  alt="dummy_image"
                  fill
                  sizes="(max-width: 1024px) 75vw, 100vw"
                  classNames={{
                    figure:
                      "aspect-video rounded overflow-hidden transition-all max-md:aspect-video max-lg:aspect-[34/13]",
                  }}
                />
              </Link>
            </CarouselItem>
          )}
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
                src={getImageSrc({
                  product: product.slug,
                  collection: collection.slug,
                  name: gallery!.medias[0].name,
                })}
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
  product,
  collection,
  classNames,
}: {
  data: Array<Media>;
  product: string;
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
          render={({ title, name }) => (
            <CarouselItem>
              <Image
                src={getImageSrc({ product, collection, name })}
                alt={title}
                fill
                sizes="50vw"
                classNames={{ figure: "aspect-square rounded w-full" }}
              />
            </CarouselItem>
          )}
        />
      }
      dotsElement={
        <Mapper
          data={data}
          render={({ title, name }, index) => (
            <CarouselDot index={index} className={cn("aspect-square basis-9 border text-xl", classNames?.dots)}>
              <Image
                src={getImageSrc({ product, collection, name })}
                alt={title}
                fill
                sizes="10vw"
                classNames={{ figure: "aspect-square rounded w-full" }}
              />
            </CarouselDot>
          )}
        />
      }
      classNames={{
        ...classNames,
      }}
    />
  );
};
