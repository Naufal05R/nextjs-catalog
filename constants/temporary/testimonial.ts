import { defineConst } from "@/lib/utils";

const testimonials = defineConst([
  {
    stars: 5,
    name: "Ahmad Shafiq",
    citizen: "Indonesia",
    createdAt: "10-July-2024",
    comment: "Kualitas yang luar biasa dan desain yang memukau. Saya benar-benar jatuh cinta! ✨👌🏻🤍",
  },
  {
    stars: 5,
    name: "Joko Sutrisno",
    citizen: "Indonesia",
    createdAt: "2-Oktober-2024",
    comment: "Benar-benar indah! Persis seperti yang ditunjukkan, tiba dengan cepat, dan sangat menawan.",
  },
  {
    stars: 5,
    name: "Gabriella Olivia",
    citizen: "Indonesia",
    createdAt: "5-September-2024",
    comment: "Sangat fantastis! Ini adalah karya yang paling sempurna yang pernah saya lihat.",
  },
] as const);

export default testimonials;
