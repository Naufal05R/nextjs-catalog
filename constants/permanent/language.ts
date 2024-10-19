import { defineConst } from "@/lib/utils";

const languages = defineConst([
  { key: "ID", label: "Bahasa" },
  { key: "EN", label: "English" },
] as const);

export default languages;
