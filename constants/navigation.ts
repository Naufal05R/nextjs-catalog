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
    href: "/guestbook",
  },
  {
    key: "about",
    label: "About",
    href: "/about-us",
  },
  {
    key: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    key: "contact",
    label: "Contact",
    href: "/",
  },
] as const);

export default navigations;
