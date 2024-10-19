import { defineConst } from "@/lib/utils";

const collections = defineConst([
  {
    title: "Ring",
    description: "Collection of rings",
    href: "/collections/ring",
  },
  {
    title: "Necklace",
    description: "Collection of necklaces",
    href: "/collections/necklace",
  },
  {
    title: "Bracelets",
    description: "Collection of bracelets",
    href: "/collections/bracelets",
  },
] as const);

export default collections;
