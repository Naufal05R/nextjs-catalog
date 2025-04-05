import { prisma } from "@/lib/prisma";

const cincin_surgawi = async () => {
  await prisma.product.upsert({
    where: { id: "cm3cerfco0002dgfuxcukhnko" },
    update: {},
    create: {
      id: "cm3cerfco0002dgfuxcukhnko",
      title: "Cincin Surgawi",
      slug: "cincin-surgawi",
      color: "Midnight Blue",
      state: "Majapahit",
      width: 12,
      height: 10,
      length: 9.5,
      weight: 24,
      price: 1250000,
      discount: 12,
      isFavorite: true,
      description: "This is Cincin Kehidupan product coming from Cincin collection",
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Batu Crystal" success!');
};

export default {
  cincin_surgawi,
};
