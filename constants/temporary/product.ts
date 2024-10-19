import { defineConst } from "@/lib/utils";

export interface Products {
  title: string;
  slug: string;
  price: number;
  discount: number;
  href: string;
}

const products = defineConst([
  {
    title: "Rose Petal Ring",
    slug: "rose-petal-ring",
    price: 19250000,
    discount: 10.0,
    href: "/collections/ring/rose-petal-ring",
  },
  {
    title: "Sunflower Ring",
    slug: "sunflower-ring",
    price: 17000000,
    discount: 8.7,
    href: "/collections/ring/sunflower-ring",
  },
  {
    title: "Lavender Dream Ring",
    slug: "lavender-dream-ring",
    price: 15750000,
    discount: 9.2,
    href: "/collections/ring/lavender-dream-ring",
  },
  {
    title: "Daisy Chain Ring",
    slug: "daisy-chain-ring",
    price: 18350000,
    discount: 9.5,
    href: "/collections/ring/daisy-chain-ring",
  },
  {
    title: "Jasmine Journey Ring",
    slug: "jasmine-journey-ring",
    price: 20550000,
    discount: 10.7,
    href: "/collections/ring/jasmine-journey-ring",
  },
  {
    title: "Ocean Breeze Ring",
    slug: "ocean-breeze-ring",
    price: 22500000,
    discount: 10.0,
    href: "/collections/ring/ocean-breeze-ring",
  },
  {
    title: "Mountain Peak Ring",
    slug: "mountain-peak-ring",
    price: 19500000,
    discount: 7.4,
    href: "/collections/ring/mountain-peak-ring",
  },
  {
    title: "Forest Floor Ring",
    slug: "forest-floor-ring",
    price: 18450000,
    discount: 7.3,
    href: "/collections/ring/forest-floor-ring",
  },
  {
    title: "Starlight Ring",
    slug: "starlight-ring",
    price: 20700000,
    discount: 8.2,
    href: "/collections/ring/starlight-ring",
  },
  {
    title: "River's Edge Ring",
    slug: "river-s-edge-ring",
    price: 19750000,
    discount: 8.6,
    href: "/collections/ring/river-s-edge-ring",
  },
  {
    title: "Celestial Bloom Ring",
    slug: "celestial-bloom-ring",
    price: 24100000,
    discount: 11.9,
    href: "/collections/ring/celestial-bloom-ring",
  },
  {
    title: "Cosmic Dream Ring",
    slug: "cosmic-dream-ring",
    price: 20350000,
    discount: 10.7,
    href: "/collections/ring/cosmic-dream-ring",
  },
  {
    title: "Whimsy Wing Ring",
    slug: "whimsy-wing-ring",
    price: 19300000,
    discount: 8.6,
    href: "/collections/ring/whimsy-wing-ring",
  },
  {
    title: "Enchanted Night Ring",
    slug: "enchanted-night-ring",
    price: 22450000,
    discount: 10.4,
    href: "/collections/ring/enchanted-night-ring",
  },
  {
    title: "Ethereal Bloom Ring",
    slug: "ethereal-bloom-ring",
    price: 21950000,
    discount: 9.1,
    href: "/collections/ring/ethereal-bloom-ring",
  },
] as const);

export default products;
