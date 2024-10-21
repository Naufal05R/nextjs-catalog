import { defineConst } from "@/lib/utils";

export interface Product {
  title: string;
  slug: string;
  price: number;
  discount?: number;
  href: string;
}

const products = defineConst([
  {
    title: "Rose Petal Ring",
    slug: "rose-petal-ring",
    price: 1_925_000,
    discount: 10.0,
    href: "/collections/ring/rose-petal-ring",
  },
  {
    title: "Sunflower Ring",
    slug: "sunflower-ring",
    price: 1_700_000,
    discount: 8.7,
    href: "/collections/ring/sunflower-ring",
  },
  {
    title: "Lavender Dream Ring",
    slug: "lavender-dream-ring",
    price: 1_575_000,
    discount: 9.2,
    href: "/collections/ring/lavender-dream-ring",
  },
  {
    title: "Daisy Chain Ring",
    slug: "daisy-chain-ring",
    price: 1_835_000,
    discount: 9.5,
    href: "/collections/ring/daisy-chain-ring",
  },
  {
    title: "Jasmine Journey Ring",
    slug: "jasmine-journey-ring",
    price: 2_055_000,
    discount: 10.7,
    href: "/collections/ring/jasmine-journey-ring",
  },
  {
    title: "Ocean Breeze Ring",
    slug: "ocean-breeze-ring",
    price: 2_250_000,
    discount: 10.0,
    href: "/collections/ring/ocean-breeze-ring",
  },
  {
    title: "Mountain Peak Ring",
    slug: "mountain-peak-ring",
    price: 1_950_000,
    discount: 7.4,
    href: "/collections/ring/mountain-peak-ring",
  },
  {
    title: "Forest Floor Ring",
    slug: "forest-floor-ring",
    price: 1_845_000,
    discount: 7.3,
    href: "/collections/ring/forest-floor-ring",
  },
  {
    title: "Starlight Ring",
    slug: "starlight-ring",
    price: 2_070_000,
    discount: 8.2,
    href: "/collections/ring/starlight-ring",
  },
  {
    title: "River's Edge Ring",
    slug: "river-s-edge-ring",
    price: 1_975_000,
    discount: 8.6,
    href: "/collections/ring/river-s-edge-ring",
  },
  {
    title: "Celestial Bloom Ring",
    slug: "celestial-bloom-ring",
    price: 2_410_000,
    discount: 11.9,
    href: "/collections/ring/celestial-bloom-ring",
  },
  {
    title: "Cosmic Dream Ring",
    slug: "cosmic-dream-ring",
    price: 2_035_000,
    discount: 10.7,
    href: "/collections/ring/cosmic-dream-ring",
  },
  {
    title: "Whimsy Wing Ring",
    slug: "whimsy-wing-ring",
    price: 1_930_000,
    discount: 8.6,
    href: "/collections/ring/whimsy-wing-ring",
  },
  {
    title: "Enchanted Night Ring",
    slug: "enchanted-night-ring",
    price: 2_245_000,
    discount: 10.4,
    href: "/collections/ring/enchanted-night-ring",
  },
  {
    title: "Ethereal Bloom Ring",
    slug: "ethereal-bloom-ring",
    price: 2_195_000,
    discount: 9.1,
    href: "/collections/ring/ethereal-bloom-ring",
  },
] as const);

export default products;
