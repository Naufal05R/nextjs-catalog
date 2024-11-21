import { prisma } from "./prisma";
import { category, collection, gallery, media, product, tag, tags_on_products } from "./seeds";

(async () => {
  try {
    await collection();
    await category();
    await product();
    await gallery();
    await media();
    await tag();
    await tags_on_products();

    console.log("All scripts executed successfully!");
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
