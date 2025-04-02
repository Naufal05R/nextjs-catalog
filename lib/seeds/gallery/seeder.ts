import { prisma } from "@/lib/prisma";

export const batu_crystal = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm3ceev1s0004dr9f0a1eazdw" },
    update: {},
    create: {
      id: "cm3ceev1s0004dr9f0a1eazdw",
      title: "Batu Crystal",
      slug: "batu-crystal",
      productId: "cm3ceev1q0002dr9fdnrukttj",
    },
  });

  console.log('Seeding Gallery "Batu Crystal" success!');
};

export const cincin_surgawi = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm3cerfcq0004dgfumzio2iyj" },
    update: {},
    create: {
      id: "cm3cerfcq0004dgfumzio2iyj",
      title: "Cincin Surgawi",
      slug: "cincin-surgawi",
      productId: "cm3cerfco0002dgfuxcukhnko",
    },
  });

  console.log('Seeding Gallery "Cincin Surgawi" success!');
};

export const kalung_keabadian = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm901a4ce00032e684d6pz8ue" },
    update: {},
    create: {
      id: "cm901a4ce00032e684d6pz8ue",
      title: "Kalung Keabadian",
      slug: "kalung-keabadian",
      productId: "cm8zzj7fb00002e68gubmouwg",
    },
  });

  console.log('Seeding Gallery "Kalung Keabadian" success!');
};
