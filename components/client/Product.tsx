import Link from "next/link";
import React from "react";
import { Image } from "../server/Media";
import { cn, formatPrice } from "@/lib/utils";
import { Product as ProductType } from "@prisma/client";
import { getImageSrc } from "@/lib/utils";

interface ProductProps extends Pick<ProductType, "title" | "slug" | "price" | "discount"> {
  thumbnail: string;
  collection: string;
  classNames?: {
    wrapper?: string;
  };
}

const Product = async ({ title, slug, price, discount, collection, thumbnail, classNames }: ProductProps) => {
  const { wrapper } = classNames ?? {};

  const src = getImageSrc({ collection, product: slug, name: thumbnail });

  return (
    <Link
      href={`/collections/${collection}/${slug}`}
      draggable={false}
      className={cn("group relative select-none", wrapper)}
    >
      <Image
        src={src || "/"}
        alt={title}
        fill
        sizes="25vw"
        classNames={{
          figure: "w-full aspect-square rounded overflow-hidden transition-all",
        }}
      />

      <blockquote className="mt-4">
        <h5 className="select-none text-sm text-slate-800">{title}</h5>
        <p className="select-none text-sm text-slate-500">Rp {formatPrice(price)}</p>
        {!!discount && (
          <p className="absolute -left-2.5 -top-4 z-20 grid w-24 -rotate-12 select-none place-items-center whitespace-nowrap text-nowrap rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-slate-50">
            {discount}% Off!
          </p>
        )}
      </blockquote>
    </Link>
  );
};

export default Product;
