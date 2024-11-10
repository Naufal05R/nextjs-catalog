import { prisma } from "./prisma";
import { category, collection, gallery, media, product } from "./seeds";

(async () => {
  try {
    await collection();
    await category();
    await product();
    await gallery();
    await media();

    console.log("All scripts executed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
