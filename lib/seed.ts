import { prisma } from "./prisma";
import { category, collection, gallery, media, product, tag } from "./seeds";

(async () => {
  try {
    await collection();
    await category();
    await product();
    await gallery();
    await media();
    await tag();

    console.log("All scripts executed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
