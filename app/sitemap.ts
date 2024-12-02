import type { MetadataRoute } from "next";
import { getAllProduct } from "../lib/actions/product.action";
import { getAllNews } from "@/lib/actions/news.action";
import { navigations } from "@/constants";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProduct = await getAllProduct();
  const allNews = await getAllNews();

  const navigationPages: MetadataRoute.Sitemap = navigations.slice(1).map(({ href }) => ({
    url: `${SERVER_URL}${href}`,
    lastModified: new Date(),
  }));

  const productPages: MetadataRoute.Sitemap =
    allProduct?.map(({ slug, updatedAt }) => ({
      url: `${SERVER_URL}/products/${slug}`,
      lastModified: updatedAt,
    })) ?? [];

  const collectionProductPages: MetadataRoute.Sitemap =
    allProduct?.map(({ slug, collection, updatedAt }) => ({
      url: `${SERVER_URL}/collections/${collection.slug}/${slug}`,
      lastModified: updatedAt,
    })) ?? [];

  const newsPages: MetadataRoute.Sitemap =
    allNews?.map(({ slug, updatedAt }) => ({
      url: `${SERVER_URL}/news/${slug}`,
      lastModified: updatedAt,
    })) ?? [];

  return [
    {
      url: SERVER_URL,
      lastModified: new Date(),
    },
    ...navigationPages,
    ...productPages,
    ...collectionProductPages,
    ...newsPages,
  ];
}
