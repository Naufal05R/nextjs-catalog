import { SeedPrisma } from "@snaplet/seed/adapter-prisma";
import { defineConfig } from "@snaplet/seed/config";
import { prisma } from "./lib/prisma";

export default defineConfig({
  adapter: () => {
    return new SeedPrisma(prisma);
  },
  select: ["!*_prisma_migrations"],
});
