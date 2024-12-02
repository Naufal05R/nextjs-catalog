import type { MetadataRoute } from "next";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: `${SERVER_URL}/sitemap.xml`,
  };
}
