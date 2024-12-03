import React from "react";
import Link from "next/link";

import Mapper from "./Mapper";
import { Archive, ArchiveRestore, Grid2x2Plus, Pencil, Star, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  archiveProduct,
  deleteProduct,
  getAllProduct,
  toggleFavoriteProduct,
  unarchiveProduct,
} from "@/lib/actions/product.action";
import { EmptyState, EmptyStateWithButton } from "@/components/server/Empty";
import { cn, countDiscount, formatPrice } from "@/lib/utils";
import { Image, ImageComponentProps } from "@/components/server/Media";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, Tag } from "@prisma/client";
import { getMediaSrc } from "@/lib/utils";
import { getDynamicBlurDataURL } from "@/lib/actions/image.action";
import { ToggleButton } from "../client/Button";

interface ProductDisplay {
  isReady: boolean;
  collection?: string;
}

interface ProductResult {
  query: string;
  currentPage: number;
}

interface DashbaordProductCardProps extends Product {
  collection: string;
  thumbnail: string;
  tags: Array<Tag>;
}

interface CatalogProductCardProps extends Product {
  prefix?: string;
  category: string;
  imageProps: WithRequired<Partial<ImageComponentProps>, "src">;
  tags: Array<Tag>;
}

export const DashboardProductDisplay = async ({ isReady, collection }: ProductDisplay) => {
  const products = await getAllProduct({ where: { isReady, collection: { slug: collection } } });

  return products && !!products.length ? (
    <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
      <Mapper
        data={products}
        render={({ gallery, collection: { slug }, ...product }) => {
          return (
            !!gallery &&
            !!gallery.medias.length && (
              <DashbaordProductCard {...product} collection={slug} thumbnail={gallery.medias[0].name} />
            )
          );
        }}
      />

      <CreateProductCard collection={collection} />
    </ul>
  ) : isReady ? (
    <EmptyStateWithButton
      title="Products is empty, Please Create a new one!"
      href={`/dashboard/products/${collection}/add`}
      alt="Create Product"
    />
  ) : (
    <EmptyState title="Archived Products is empty!" />
  );
};

export const DashbaordProductCard = async ({
  id,
  title,
  slug,
  price,
  state,
  tags,
  isReady,
  isFavorite,
  discount,
  description,
  collection,
  thumbnail,
}: DashbaordProductCardProps) => {
  const src = getMediaSrc({ collection, productId: id, name: thumbnail });
  const blurDataURL = await getDynamicBlurDataURL(src);

  return (
    <Card className="relative col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
      <ToggleButton
        icon={<Star fill={isFavorite ? "#f59e0b" : "#fff"} />}
        identifier={id}
        toggleAction={toggleFavoriteProduct}
      />

      <CardHeader>
        <Image
          src={src}
          alt={slug}
          fill
          sizes="25vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          classNames={{ figure: "w-full aspect-video rounded-md" }}
        />
      </CardHeader>

      <CardContent>
        <CardTitle className="line-clamp-1 whitespace-nowrap text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="mb-2 line-clamp-3">{description}</CardDescription>
        <ul className="ml-auto flex w-fit flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-sky-100 text-sky-900 hover:bg-sky-100/80 dark:bg-sky-800 dark:text-sky-50 dark:hover:bg-sky-800/80"
          >
            Sapphire
          </Badge>
          <Badge
            variant="secondary"
            className="bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80"
          >
            {state} Origin
          </Badge>

          <Mapper data={tags} render={({ title }) => <Badge variant="secondary">{title}</Badge>} />
        </ul>
      </CardContent>

      <CardFooter className={cn("flex-1 justify-end", { "justify-between": !!discount })}>
        {!!discount && (
          <Badge variant={"outline"} className="border-rose-200 text-rose-500">
            {discount}% OFF
          </Badge>
        )}
        <div className="flex flex-col">
          {!!discount && (
            <CardDescription className="w-full text-right text-xs line-through">{formatPrice(price)}</CardDescription>
          )}
          <CardTitle className="w-full select-none text-right text-base font-semibold">
            Rp. {formatPrice(countDiscount(price, discount ?? 0))}
          </CardTitle>
        </div>
      </CardFooter>

      <CardFooter className="mt-auto gap-4">
        <Button className="flex-1" form={`archive-product-${id}`}>
          <form id={`archive-product-${id}`} action={isReady ? archiveProduct : unarchiveProduct} className="hidden" />
          <input type="hidden" className="hidden" name="id" defaultValue={id} readOnly form={`archive-product-${id}`} />
          {isReady ? <Archive /> : <ArchiveRestore />}
          {isReady ? "Archive" : "Unarchive"}
        </Button>

        <Button asChild={isReady} className="flex-1" form={`delete-product-${id}`}>
          {isReady ? (
            <Link href={`/dashboard/products/${collection}/edit/${slug}`}>
              <Pencil />
              Edit
            </Link>
          ) : (
            <>
              <form id={`delete-product-${id}`} action={deleteProduct} className="hidden" />
              <input
                type="hidden"
                className="hidden"
                name="id"
                defaultValue={id}
                readOnly
                form={`delete-product-${id}`}
              />
              <Trash2 />
              Delete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const CreateProductCard = ({ collection }: { collection?: string }) => {
  return (
    <Card
      className={cn(
        "relative col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4",
        { invisible: !collection },
      )}
    >
      <CardHeader className="invisible">
        <figure className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="invisible">
        <CardTitle className="text-lg font-semibold">Invisible Title</CardTitle>
        <CardDescription className="mb-2 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur unde, quidem amet labore quasi
          laboriosam placeat ut repellendus. Voluptatum velit optio repellat, cum tempora fuga harum aperiam provident
          voluptate dolorum! Architecto, harum?
        </CardDescription>
        <Badge>Invisible Badge</Badge>
      </CardContent>
      <CardFooter className="invisible">
        <div className="flex flex-col">
          <CardDescription className="w-full">Invisible Price</CardDescription>
          <CardTitle className="w-full">Invisible Price</CardTitle>
        </div>
      </CardFooter>
      <CardFooter className="invisible">
        <Button className="flex-1">Invisible Button</Button>
      </CardFooter>

      {collection && (
        <Link
          href={`/dashboard/products/${collection}/add`}
          className="absolute inset-0 flex size-full flex-col items-center justify-center"
        >
          <Grid2x2Plus className="mx-auto" size={64} />
          <CardTitle className="mt-4 line-clamp-1 whitespace-nowrap text-xl font-semibold">
            Create new <span className="capitalize">{collection}</span>
          </CardTitle>
        </Link>
      )}
    </Card>
  );
};

export const CatalogProductCard = ({
  title,
  slug,
  state,
  tags,
  description,
  category,
  prefix,
  price,
  discount,
  imageProps,
}: CatalogProductCardProps) => {
  const exceededTags = Math.max(tags.length - 5, 0);

  return (
    <Link
      href={`${prefix ?? ""}/products/${slug}`}
      draggable={false}
      className="group flex select-none flex-col rounded-md p-4 transition-shadow duration-300 card-shadow"
    >
      <Image
        fill
        sizes="25vw"
        alt={slug}
        {...imageProps}
        classNames={{
          figure: "w-full aspect-[4/3] rounded overflow-hidden transition-all",
          image: "group-hover:scale-110 transition-transform duration-500",
        }}
      />

      <blockquote className="mt-4 flex flex-col">
        <h5 className="mb-2 flex select-none items-center justify-between text-lg font-semibold text-slate-800">
          <span className="line-clamp-1">{title}</span>
        </h5>
        <ul className="mb-4 flex h-[55px] flex-row flex-wrap gap-[11px] overflow-hidden [&>*]:h-fit">
          <Badge
            variant="secondary"
            className="bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80"
          >
            {state}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-sky-100 text-sky-900 hover:bg-sky-100/80 dark:bg-sky-800 dark:text-sky-50 dark:hover:bg-sky-800/80"
          >
            {category}
          </Badge>
          <Mapper
            // TODO: Should simplifying back data right after bug fixed by nextjs or react
            data={Array.from(new Set(tags)).slice(0, 5)}
            render={({ title }) => (
              // TODO: Should removing key props right after bug fixed by nextjs or react
              <Badge key={title} variant="secondary" className="bg-slate-200/60 text-slate-800 hover:bg-slate-200/40">
                {title}
              </Badge>
            )}
          />
          {!!exceededTags && (
            <Badge variant="secondary" className="bg-slate-200/60 text-slate-800 hover:bg-slate-200/40">
              {exceededTags}+
            </Badge>
          )}
        </ul>
        <p className="mb-4 line-clamp-2 select-none text-sm text-slate-500">{description}</p>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-rose-200 text-rose-400 focus:ring-rose-400">
            %{discount} OFF!
          </Badge>
          <div>
            {discount && (
              <p className="select-none text-right text-xs text-rose-400 line-through">{formatPrice(price)}</p>
            )}
            <p className="select-none text-right text-base font-semibold">
              Rp {formatPrice(countDiscount(price, discount ?? 0))}
            </p>
          </div>
        </div>
      </blockquote>
    </Link>
  );
};

export const SearchProductResult = async ({ query }: ProductResult) => {
  const allProducts = await getAllProduct({
    where: {
      isReady: true,
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          slug: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          color: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          tags: {
            some: {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  slug: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        },
      ],
    },
  });

  return (
    <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 xs:grid-cols-6 md:grid-cols-9 xl:grid-cols-12">
      {!!allProducts?.length && (
        <Mapper
          data={allProducts}
          render={({ category, gallery, ...product }) => {
            const src = getMediaSrc({
              productId: product.id,
              collection: product.collection.slug,
              name: gallery!.medias[0].name,
            });
            return (
              <li className="col-span-3">
                <CatalogProductCard {...product} category={category.title} imageProps={{ src }} />
              </li>
            );
          }}
        />
      )}
    </ul>
  );
};
