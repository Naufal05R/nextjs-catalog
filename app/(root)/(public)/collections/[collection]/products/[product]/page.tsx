import React from "react";
import Link from "next/link";

import { CarouselDetail } from "@/components/client/Carousel";

// TODO: Should implement add to chart feature

// import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Whatsapp } from "@/components/svg";
import { formatPrice } from "@/lib/utils";
import { CopyButton } from "@/components/client/Button";
import { Metadata, ResolvingMetadata } from "next";
import { getAllProduct, getProduct } from "@/lib/actions/product.action";

interface DetailProductPageProps {
  params: Promise<{ collection: string; product: string }>;
}

export async function generateMetadata(
  { params }: DetailProductPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const notFoundMetadata = {
    title: "Product not found!",
    description: "Couldn't serve page for not existing product",
  };

  try {
    const slug = (await params).product;
    const product = await getProduct({ where: { slug } });

    if (!product) return notFoundMetadata;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: product.title,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [...previousImages],
      },
    };
  } catch (error) {
    console.error(error);
    return notFoundMetadata;
  }
}

export async function generateStaticParams() {
  try {
    const products = await getAllProduct();

    if (!products) throw new Error(`Failed to get products: ${typeof products}`);

    return products.map(({ slug, collection }) => ({ collection: collection.slug, product: slug }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

const DetailProductPage = async ({ params }: DetailProductPageProps) => {
  const { product, collection } = await params;

  const selectedProduct = await prisma.product.findUnique({
    where: { slug: product },
    include: { gallery: { include: { medias: true } } },
  });

  if (!selectedProduct) {
    notFound();
  }

  return (
    <>
      <section className="flex flex-col gap-8 pt-8 sm:flex-row">
        {selectedProduct.gallery?.medias && (
          <CarouselDetail
            data={selectedProduct.gallery.medias}
            productId={selectedProduct.id}
            collection={collection}
            classNames={{ root: "md:flex-1", dots: "basis-1/6" }}
          />
        )}

        <article className="md:flex-1">
          <h4 className="mb-8 text-3xl font-medium uppercase">{selectedProduct?.title}</h4>

          <dl className="grid flex-1 grid-cols-2 border-t">
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Original State</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{selectedProduct.state}</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Size</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">
                {selectedProduct.width} x {selectedProduct.height} x {selectedProduct.length} mm {"(estm)"}
              </p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Weight</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{selectedProduct.weight} crt</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Color</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">{selectedProduct.color}</p>
            </dd>
          </dl>

          <menu className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="secondary" asChild className="flex-1 px-0 shadow-none">
              <Link
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=628999812808&text=Permisi%2C%20apakah%20produk%20${selectedProduct.title.replace(" ", "%20")}%20tersedia%20%F0%9F%91%8B%F0%9F%98%80`}
                className="flex items-center gap-0 divide-x"
              >
                <li className="px-4 py-2 text-slate-600">Question?</li>
                <li className="flex flex-1 items-center gap-2 px-4 py-2 text-slate-600">
                  <Whatsapp /> 62 899-9812-808
                </li>
              </Link>
            </Button>

            <CopyButton title="Share Link" />

            {/* <fieldset className="flex basis-5/6 items-center gap-2 overflow-visible">
              <Button variant="secondary" className="text-slate-600 shadow-none">
                <Minus />
              </Button>
              <Input className="flex-1 text-center text-slate-600 shadow-none" customize="no-focus" />
              <Button variant="secondary" className="text-slate-600 shadow-none">
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
            </div> */}
          </menu>

          <p className="mt-8 text-sm text-slate-600">
            {selectedProduct.title} <br />
            <br /> Ukuran : {selectedProduct.width} x {selectedProduct.height} x {selectedProduct.length} mm {"(estm)"}
            <br /> Berat : {selectedProduct.weight} crt
            <br /> Origin : {selectedProduct.state}
            <br /> Warna : {selectedProduct.color} <br />
            <br /> {selectedProduct.description} <br />
            <br /> Harga Rp {formatPrice(selectedProduct.price)},-
            <br />
          </p>
        </article>
      </section>

      <section className="grid grid-cols-12"></section>
    </>
  );
};

export default DetailProductPage;
