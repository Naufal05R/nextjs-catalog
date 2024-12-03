import React from "react";
import { FrontEndNewsDisplay } from "@/components/server/News";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description: "Legenda Permata official update news",
  keywords: [
    "Legenda Permata",
    "Permata Legenda",
    "Berita Permata",
    "Berita Cincin",
    "Berita Batu Cincin",
    "Batu Cincin",
    "Batu Mulia",
    "Logam Mulia",
    "Cincin Permata",
    "Permata",
    "Cincin",
    "Berita Idozz",
  ],
  openGraph: {
    description:
      "Legenda Permata adalah toko perhiasan online terpercaya yang menawarkan koleksi eksklusif perhiasan berlian, emas, dan permata berkualitas tinggi.",
  },
};

const NewsPage = () => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">News</h4>

      <FrontEndNewsDisplay />
    </section>
  );
};

export default NewsPage;
