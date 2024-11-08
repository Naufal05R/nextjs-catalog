import React from "react";
import { CarouselDetail, CarouselFeatured, CarouselThumbnail } from "../client/Carousel";
import { getAllProduct } from "@/lib/actions/product.action";
import Mapper from "./Mapper";

interface DynamicCarouselBaseProps {
  variant: "thumbnail" | "featured" | "detail";
}

interface CarouselThumbnailVariantProps extends DynamicCarouselBaseProps {
  variant: "thumbnail";
  props: Parameters<typeof CarouselThumbnail>[0];
}

interface CarouselFeaturedVariantProps extends DynamicCarouselBaseProps {
  variant: "featured";
  props: Parameters<typeof CarouselFeatured>[0];
}

interface CarouselDetailVariantProps extends DynamicCarouselBaseProps {
  variant: "detail";
  props: Parameters<typeof CarouselDetail>[0];
}

type DynamicCarouselProps = DynamicCarouselBaseProps &
  (CarouselDetailVariantProps | CarouselFeaturedVariantProps | CarouselThumbnailVariantProps);

const DynamicCarousel = ({ variant, props }: DynamicCarouselProps) => {
  if (variant === "featured") {
    const { data } = props;
    return <CarouselFeatured data={data} />;
  }

  if (variant === "thumbnail") {
    const { data } = props;
    return <CarouselThumbnail data={data} />;
  }

  if (variant === "detail") {
    const { data, product, collection } = props;
    return <CarouselDetail data={data} product={product} collection={collection} />;
  }
};

export const DynamicCarouselThumbnail = async () => {
  const Component = async () => {
    const allProducts = await getAllProduct();

    return (
      allProducts && (
        <DynamicCarousel
          variant="thumbnail"
          props={{
            data: allProducts,
          }}
        />
      )
    );
  };

  return (
    <React.Suspense
      fallback={<div className="aspect-video flex-1 rounded bg-slate-200 max-lg:aspect-[34/13] max-md:aspect-video" />}
    >
      <Component />
    </React.Suspense>
  );
};

export const DynamicCarouselFeatured = () => {
  const Component = async () => {
    const allProducts = await getAllProduct();

    return (
      allProducts && (
        <DynamicCarousel
          variant="featured"
          props={{
            data: allProducts,
          }}
        />
      )
    );
  };

  return (
    <React.Suspense
      fallback={
        <div className="max-w-full overflow-hidden">
          <ul className="-ml-4 flex min-w-fit items-center">
            <Mapper
              data={[1, 2, 3, 4]}
              render={() => (
                <li className="pl-4 xs:min-w-[50%] md:min-w-[calc(100%/3)] xl:min-w-[25%]">
                  <div className="h-96 rounded bg-slate-200"></div>
                </li>
              )}
            />
          </ul>
        </div>
      }
    >
      <Component />
    </React.Suspense>
  );
};
