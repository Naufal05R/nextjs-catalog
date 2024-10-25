import React from "react";
import Image from "@/components/Image";
import { Carousel } from "@/components/client/Carousel";
import { products } from "@/constants";
import Link from "next/link";
import { Copy, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { collection: string; product: string } }) => {
  const product = await prisma.product.findUnique({ where: { slug: params.product } }); // products.find((product) => product.slug === params.product);

  const getRandomIntBetween1And3 = () => {
    return Math.floor(Math.random() * 3) + 1;
  };

  if (!product) {
    console.log(product);
    notFound();
  }

  return (
    <>
      <section className="grid grid-cols-12 gap-x-8 pt-8">
        <Carousel
          data={products}
          plugins={["fade"]}
          showDots
          slidesElement={
            <Image
              src={`/dummy_${getRandomIntBetween1And3()}.jpg`}
              alt="dummy_1"
              fill
              sizes="50vw"
              classNames={{ figure: "aspect-square rounded w-full" }}
            />
          }
          dotsElement={
            <Image
              src={"/dummy_1.jpg"}
              alt="dummy_1"
              fill
              sizes="10vw"
              classNames={{ figure: "aspect-square rounded w-full" }}
            />
          }
          classNames={{ root: "col-span-6", dotsContainer: "max-w-full" }}
        />

        <article className="col-span-6">
          <h4 className="mb-8 text-3xl font-medium uppercase">{product?.title}</h4>

          <dl className="grid flex-1 grid-cols-2 border-t">
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Original State</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">Ceylon Srilangka</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Size</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">9.3 x 8.3 x 5.1 mm {"(estm)"}</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Weight</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">3.6 crt</p>
            </dd>
            <dt className="overflow-hidden whitespace-nowrap border-b py-4 text-lg font-medium">
              <p className="line-clamp-1">Color</p>
            </dt>
            <dd className="overflow-hidden border-b py-4 text-base font-normal text-slate-500">
              <p className="line-clamp-1">Purple pinkish red, transparent SI, cutting</p>
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
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"></path>
                  </svg>{" "}
                  62 899-9812-808
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
            Pink Sapphire Ceylon <br />
            <br /> Ukuran : 9.3 x 8.3 x 5.1 mm (estm)
            <br /> Berat : 3.6 crt
            <br /> Origin : Ceylon Srilangka
            <br /> Warna : Purple pinkish red, transparent SI, cutting <br />
            <br /> Ini bisa masuk pink sapphire tetapu warnanya cukup tua sehingga bisa masuk juga menjadi ruby Batunya
            crystal, lumayan bersih, lusternya bagus. <br />
            <br /> Harga Rp 3.500.000,-
          </p>
        </article>
      </section>

      <section className="grid grid-cols-12"></section>
    </>
  );
};

export default page;
