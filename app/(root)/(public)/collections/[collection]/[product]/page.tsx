import React from "react";
import Image from "@/components/Image";
import { Carousel } from "@/components/client/Carousel";
import { products } from "@/constants";

const page = ({ params }: { params: { collection: string; product: string } }) => {
  return (
    <section className="pt-8">
      <Carousel
        data={products}
        showDots
        el={
          <Image
            src={"/dummy_1.jpg"}
            alt="dummy_1"
            fill
            sizes="10vw"
            classNames={{ figure: "aspect-square rounded w-full" }}
          />
        }
      />
    </section>
  );
};

export default page;
