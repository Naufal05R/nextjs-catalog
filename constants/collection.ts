import { defineConst } from "@/lib/utils";

const collections = defineConst([
  {
    key: "ring",
    title: "Ring",
    description: "Collection of rings",
    href: "/collections/ring",
  },
  {
    key: "necklace",
    title: "Necklace",
    description: "Collection of necklaces",
    href: "/collections/necklace",
  },
  {
    key: "bracelets",
    title: "Bracelets",
    description: "Collection of bracelets",
    href: "/collections/bracelets",
  },
] as const);

export default collections;
