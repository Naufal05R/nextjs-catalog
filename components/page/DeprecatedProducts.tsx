import React from "react";
import Mapper from "@/components/server/Mapper";
import { getAllProduct } from "@/lib/actions/product.action";
import { CreateProductCard, DashbaordProductCard } from "@/components/server/Product";
import { EmptyState } from "../server/Empty";

const DeprecatedProducts = async () => {
  const deprecatedProducts = await getAllProduct({ where: { isReady: false } });
  return (
    <section className="grid size-full place-items-start">
      {deprecatedProducts && !!deprecatedProducts.length ? (
        <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
          <Mapper
            data={deprecatedProducts}
            render={({ gallery, collection: { slug }, ...product }) => {
              return (
                !!gallery &&
                !!gallery.medias.length && (
                  <DashbaordProductCard {...product} collection={slug} thumbnail={gallery.medias[0].name} />
                )
              );
            }}
          />

          <CreateProductCard />
        </ul>
      ) : (
        <EmptyState title="There's no archived products" href="/dashboard/products" alt="Back to collection" />
      )}
    </section>
  );
};

export default DeprecatedProducts;
