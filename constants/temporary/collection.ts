import { defineConst } from "@/lib/utils";

const collections = defineConst([
  {
    title: "Ring",
    slug: "ring",
    description: "Collection of rings",
    href: "/collections/ring",
  },
  {
    title: "Necklace",
    slug: "necklace",
    description: "Collection of necklaces",
    href: "/collections/necklace",
  },
  {
    title: "Bracelets",
    slug: "bracelets",
    description: "Collection of bracelets",
    href: "/collections/bracelets",
  },
] as const);

export default collections;
