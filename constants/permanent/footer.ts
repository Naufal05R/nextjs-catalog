import { defineConst } from "@/lib/utils";

const footers = defineConst([
  "Search",
  "Shipping",
  "Return and Refund",
  "Privacy Policy",
  "Terms of Service",
  "Contact Us",
  "Do not sell my personal information",
] as const);

export default footers;
