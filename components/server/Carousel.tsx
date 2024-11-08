import React from "react";
import { CarouselDetail, CarouselFeatured, CarouselThumbnail } from "../client/Carousel";
import { getAllProduct } from "@/lib/actions/product.action";

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

export const DynamicCarouselFeatured = async () => {
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
