import { prisma } from "@/lib/prisma";

export const batu_crystal = async () => {
  await prisma.product.upsert({
    where: { id: "cm3ceev1q0002dr9fdnrukttj" },
    update: {},
    create: {
      id: "cm3ceev1q0002dr9fdnrukttj",
      title: "Batu Crystal",
      slug: "batu-crystal",
      color: "Seamless White",
      state: "Kalimalang",
      width: 12,
      height: 10,
      length: 9,
      weight: 22,
      price: 1250000,
      discount: 11.5,
      isFavorite: true,
      description: "This is Batu Crystal product coming from Batu collection",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm35mv1h500001z47i1pvnvnp",
    },
  });

  console.log('Seeding Product "Batu Crystal" success!');
};

export const cincin_surgawi = async () => {
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

export const kalung_keabadian = async () => {
  await prisma.product.upsert({
    where: { id: "cm8zzj7fb00002e68gubmouwg" },
    update: {},
    create: {
      id: "cm8zzj7fb00002e68gubmouwg",
      title: "Kalung Keabadian",
      slug: "kalung-keabadian",
      color: "Moss Green",
      state: "Raja Ampat",
      width: 11,
      height: 9,
      length: 10.5,
      weight: 24,
      price: 1150000,
      discount: 11,
      isFavorite: true,
      description: "This is Kalung Keabadian product coming from Lainnya collection",
      collectionId: "cm9015slt00012e68snz7ksb2",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Batu Crystal" success!');
};
