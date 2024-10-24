import React from "react";
import Image from "@/components/Image";
import { Carousel } from "@/components/client/Carousel";
import { products } from "@/constants";

const page = ({ params }: { params: { collection: string; product: string } }) => {
  const product = products.find((product) => product.slug === params.product);

  console.log(product);

  return (
    <>
      <section className="grid grid-cols-12 pt-8">
        <Carousel
          data={products}
          plugins={["fade"]}
          showDots
          dotsElement={
            <Image
              src={"/dummy_1.jpg"}
              alt="dummy_1"
              fill
              sizes="10vw"
              classNames={{ figure: "aspect-square rounded w-full" }}
            />
          }
          classNames={{ root: "col-span-6" }}
        />
      </section>

      <section className="grid grid-cols-12"></section>
    </>
  );
};

export default page;
