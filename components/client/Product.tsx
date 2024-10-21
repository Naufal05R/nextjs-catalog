import Link from "next/link";
import React from "react";
import Image from "../Image";
import { Product as ProductType } from "@/constants/temporary/product";
import { cn, formatPrice } from "@/lib/utils";

interface ProductProps extends ProductType {
  classNames?: {
    wrapper?: string;
  };
}

const Product = ({ title, price, discount, href, classNames }: ProductProps) => {
  const { wrapper } = classNames ?? {};

  return (
    <Link href={href} className={cn("group relative", wrapper)}>
      <Image
        src={`/dummy_1.jpg`}
        alt="dummy_image"
        fill
        sizes="25vw"
        classNames={{
          figure: "w-full aspect-square rounded transition-all",
        }}
      />

      <blockquote className="mt-4">
        <h5 className="text-sm text-slate-800">{title}</h5>
        <p className="text-sm text-slate-500">Rp {formatPrice(price)}</p>
        {discount && (
          <p className="absolute -left-2.5 -top-4 z-20 grid w-24 -rotate-12 place-items-center whitespace-nowrap text-nowrap rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-slate-50">
            {discount}% Off!
          </p>
        )}
      </blockquote>
    </Link>
  );
};

export default Product;
