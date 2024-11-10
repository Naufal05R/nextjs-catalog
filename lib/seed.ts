import { prisma } from "./prisma";
import { category, collection } from "./seeds";

(async () => {
  try {
    await collection();
    await category();

    console.log("All scripts executed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
