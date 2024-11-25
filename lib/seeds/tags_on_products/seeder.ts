import { prisma } from "@/lib/prisma";

// TODO: Should removing this file

export const shine_on_batu_crystal = async () => {
  await prisma.tagsOnProducts.upsert({
    where: {
      productId_tagId: {
        productId: "cm3ceev1q0002dr9fdnrukttj",
        tagId: "cm3qzgdg900002e67s8w57ei5",
      },
    },
    update: {},
    create: {
      productId: "cm3ceev1q0002dr9fdnrukttj",
      tagId: "cm3qzgdg900002e67s8w57ei5",
    },
  });

  console.log('Seeding Tag "Shine" on Product "Batu Crystal" success!');
};

export const shine_on_cincin_surgawi = async () => {
  await prisma.tagsOnProducts.upsert({
    where: {
      productId_tagId: {
        productId: "cm3cerfco0002dgfuxcukhnko",
        tagId: "cm3qzgdg900002e67s8w57ei5",
      },
    },
    update: {},
    create: {
      productId: "cm3cerfco0002dgfuxcukhnko",
      tagId: "cm3qzgdg900002e67s8w57ei5",
    },
  });

  console.log('Seeding Tag "Shine" on Product "Batu Surgawi" success!');
};

export const sparkle_on_cincin_surgawi = async () => {
  await prisma.tagsOnProducts.upsert({
    where: {
      productId_tagId: {
        productId: "cm3cerfco0002dgfuxcukhnko",
        tagId: "cm3qzhgv900012e67m8q70ayu",
      },
    },
    update: {},
    create: {
      productId: "cm3cerfco0002dgfuxcukhnko",
      tagId: "cm3qzhgv900012e67m8q70ayu",
    },
  });

  console.log('Seeding Tag "Sparkle" on Product "Batu Surgawi" success!');
};
