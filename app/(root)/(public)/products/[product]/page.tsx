import React from "react";
import Link from "next/link";

import { CarouselDetail } from "@/components/client/Carousel";
import { Copy, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Whatsapp } from "@/components/svg";
import { formatPrice } from "@/lib/utils";

const DetailProductPage = async ({ params }: { params: { product: string } }) => {
  const product = await prisma.product.findUnique({
    where: { slug: params.product },
    include: { collection: { select: { slug: true } }, gallery: { include: { medias: true } } },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="grid grid-cols-12 gap-x-8 pt-8">
        {product.gallery?.medias && (
          <CarouselDetail
            data={product.gallery.medias}
            product={params.product}
            collection={product.collection.slug}
            classNames={{ root: "col-span-6", dots: "basis-1/6" }}
          />
        )}

        <article className="col-span-6">
          <h4 className="mb-8 text-3xl font-medium uppercase">{product?.title}</h4>

          <dl className="grid flex-1 grid-cols-2 border-t">
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Original State</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{product.state}</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Size</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">
                {product.width} x {product.height} x {product.length} mm {"(estm)"}
              </p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Weight</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{product.weight} crt</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Color</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{product.color}</p>
            </dd>
          </dl>

          <menu className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant={"secondary"} asChild className="flex-1 px-0 shadow-none">
              <Link
                href="https://api.whatsapp.com/send?phone=628999812808&text=Permisi%2C%20apakah%20produk%20Pink%20Sapphire%20Ceylon%20tersedia%20%F0%9F%91%8B%F0%9F%98%80"
                className="flex items-center gap-0 divide-x"
              >
                <li className="px-4 py-2 text-slate-600">Question?</li>
                <li className="flex flex-1 items-center gap-2 px-4 py-2 text-slate-600">
                  <Whatsapp /> 62 899-9812-808
                </li>
              </Link>
            </Button>

            <Button
              variant={"secondary"}
              className="flex max-h-full flex-1 items-center gap-2 text-slate-600 shadow-none"
            >
              Share Link <Copy size={20} strokeWidth={1.75} />
            </Button>

            <fieldset className="flex basis-5/6 items-center gap-2 overflow-visible">
              <Button variant={"secondary"} className="text-slate-600 shadow-none">
                <Minus />
              </Button>
              <Input className="flex-1 text-center text-slate-600 shadow-none focus-visible:ring-0" />
              <Button variant={"secondary"} className="text-slate-600 shadow-none">
                <Plus />
              </Button>
            </fieldset>

            <div className="mt-4 flex basis-full flex-col gap-4">
              <Button variant={"outline"} className="w-full flex-1 shadow-none">
                Add To Cart
              </Button>

              <Button variant={"default"} className="w-full flex-1 shadow-none">
                Buy Now
              </Button>
            </div>
          </menu>

          <p className="mt-8 text-sm text-slate-600">
            {product.color} {product.state.split("s").shift()} <br />
            <br /> Ukuran : {product.width} x {product.height} x {product.length} mm {"(estm)"}
            <br /> Berat : {product.weight} crt
            <br /> Origin : {product.state}
            <br /> Warna : {product.color} <br />
            <br /> {product.description} <br />
            <br /> Harga Rp {formatPrice(product.price)},-
            <br />
          </p>
        </article>
      </section>

      <section className="grid grid-cols-12"></section>
    </>
  );
};

export default DetailProductPage;
