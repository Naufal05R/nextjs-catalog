import { prisma } from "@/lib/prisma";

export const permata_1 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3ceev1t0005dr9f5dtcm651" },
    update: {},
    create: {
      id: "cm3ceev1t0005dr9f5dtcm651",
      title: "Permata 1",
      slug: "permata-1",
      name: "000_permata-1.jpeg",
      order: 0,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  console.log('Seeding Media "Permata 1" success!');
};

export const permata_2 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3cf9uvb00032e6605eyic55" },
    update: {},
    create: {
      id: "cm3cf9uvb00032e6605eyic55",
      title: "Permata 2",
      slug: "permata-2",
      name: "001_permata-2.jpeg",
      order: 1,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  console.log('Seeding Media "Permata 2" success!');
};

export const permata_3 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3cfc3ts00042e66z4yhlgqo" },
    update: {},
    create: {
      id: "cm3cfc3ts00042e66z4yhlgqo",
      title: "Permata 3",
      slug: "permata-3",
      name: "002_permata-3.jpeg",
      order: 2,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  console.log('Seeding Media "Permata 3" success!');
};

export const blue_star_sapphire_1 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3cfn31j00052e66x5zqmqn5" },
    update: {},
    create: {
      id: "cm3cfn31j00052e66x5zqmqn5",
      title: "Blue Star Sapphire 1",
      slug: "blue-star-sapphire-1",
      name: "000_blue-star-sapphire-1.jpeg",
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  console.log('Seeding Media "Blue Star Sapphire 1" success!');
};

export const blue_star_sapphire_2 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3cfnd8u00062e66au3qgzy9" },
    update: {},
    create: {
      id: "cm3cfnd8u00062e66au3qgzy9",
      title: "Blue Star Sapphire 2",
      slug: "blue-star-sapphire-2",
      name: "001_blue-star-sapphire-2.jpeg",
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  console.log('Seeding Media "Blue Star Sapphire 2" success!');
};

export const blue_star_sapphire_3 = async () => {
  await prisma.media.upsert({
    where: { id: "cm3cfnjmt00072e660qqi4gth" },
    update: {},
    create: {
      id: "cm3cfnjmt00072e660qqi4gth",
      title: "Blue Star Sapphire 3",
      slug: "blue-star-sapphire-3",
      name: "002_blue-star-sapphire-3.jpeg",
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  console.log('Seeding Media "Blue Star Sapphire 3" success!');
};
