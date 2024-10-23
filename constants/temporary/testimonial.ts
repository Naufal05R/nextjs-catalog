import { defineConst } from "@/lib/utils";

const testimonials = defineConst([
  {
    stars: 5,
    name: "Emily Toronto",
    citizen: "Canada",
    createdAt: "2023-July-10",
    comment: "Exceptional quality and stunning design, ideal for any occasion. I'm absolutely in love! ✨👌🏻🤍",
  },
  {
    stars: 5,
    name: "Mia Calgary",
    citizen: "Canada",
    createdAt: "2023-October-02",
    comment: "Absolutely beautiful! Just as shown, arrived quickly, and they're so charming.",
  },
  {
    stars: 5,
    name: "Gabriella Olivia",
    citizen: "New York",
    createdAt: "2023-September-05",
    comment:
      "These earrings are fantastic! I needed secure backs for my second holes, and these are the perfect fit—they look adorable!",
  },
] as const);

export default testimonials;
