import { defineConst } from "@/lib/utils";

const navigations = defineConst([
  {
    key: "home",
    label: "Home",
    href: "/",
  },
  {
    key: "shop",
    label: "Shop",
    href: "/collections",
  },
  {
    key: "guestbook",
    label: "Guestbook",
    href: "/",
  },
  {
    key: "about",
    label: "About",
    href: "/",
  },
  {
    key: "blog",
    label: "Blog",
    href: "/",
  },
  {
    key: "contact",
    label: "Contact",
    href: "/",
  },
] as const);

export default navigations;
