import { prisma } from "@/lib/prisma";
import { uploadObject } from "@/lib/service";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
const STORAGE_URL = process.env.STORAGE_URL ?? "";

export const permata_1 = async () => {
  const name = "000_permata-1.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3ceev1t0005dr9f5dtcm651" },
    update: {},
    create: {
      id: "cm3ceev1t0005dr9f5dtcm651",
      title: "Permata 1",
      slug: "permata-1",
      name,
      order: 0,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Permata 1" success!');
};

export const permata_2 = async () => {
  const name = "001_permata-2.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cf9uvb00032e6605eyic55" },
    update: {},
    create: {
      id: "cm3cf9uvb00032e6605eyic55",
      title: "Permata 2",
      slug: "permata-2",
      name,
      order: 1,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Permata 2" success!');
};

export const permata_3 = async () => {
  const name = "002_permata-3.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cfc3ts00042e66z4yhlgqo" },
    update: {},
    create: {
      id: "cm3cfc3ts00042e66z4yhlgqo",
      title: "Permata 3",
      slug: "permata-3",
      name,
      order: 2,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Permata 3" success!');
};

export const blue_star_sapphire_1 = async () => {
  const name = "000_blue-star-sapphire-1.jpeg";
  const path = "cincin/cm3cerfco0002dgfuxcukhnko";

  await prisma.media.upsert({
    where: { id: "cm3cfn31j00052e66x5zqmqn5" },
    update: {},
    create: {
      id: "cm3cfn31j00052e66x5zqmqn5",
      title: "Blue Star Sapphire 1",
      slug: "blue-star-sapphire-1",
      name,
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Blue Star Sapphire 1" success!');
};

export const blue_star_sapphire_2 = async () => {
  const name = "001_blue-star-sapphire-2.jpeg";
  const path = "cincin/cm3cerfco0002dgfuxcukhnko";

  await prisma.media.upsert({
    where: { id: "cm3cfnd8u00062e66au3qgzy9" },
    update: {},
    create: {
      id: "cm3cfnd8u00062e66au3qgzy9",
      title: "Blue Star Sapphire 2",
      slug: "blue-star-sapphire-2",
      name,
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Blue Star Sapphire 2" success!');
};

export const blue_star_sapphire_3 = async () => {
  const name = "002_blue-star-sapphire-3.jpeg";
  const path = "cincin/cm3cerfco0002dgfuxcukhnko";

  await prisma.media.upsert({
    where: { id: "cm3cfnjmt00072e660qqi4gth" },
    update: {},
    create: {
      id: "cm3cfnjmt00072e660qqi4gth",
      title: "Blue Star Sapphire 3",
      slug: "blue-star-sapphire-3",
      name,
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Blue Star Sapphire 3" success!');
};

export const emerald_pendant_1 = async () => {
  const name = "000_emerald-pendant-1.jpeg";
  const path = "lainnya/cm8zzj7fb00002e68gubmouwg";

  await prisma.media.upsert({
    where: { id: "cm90187w900022e68j8gf8qf5" },
    update: {},
    create: {
      id: "cm90187w900022e68j8gf8qf5",
      title: "Emerald Pendant 1",
      slug: "emerald-pendant-1",
      name,
      order: 0,
      galleryId: "cm901a4ce00032e684d6pz8ue",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Pendant 1" success!');
};

export const emerald_pendant_2 = async () => {
  const name = "001_emerald-pendant-2.jpeg";
  const path = "lainnya/cm8zzj7fb00002e68gubmouwg";

  await prisma.media.upsert({
    where: { id: "cm901hp8a00042e68g5iovb1t" },
    update: {},
    create: {
      id: "cm901hp8a00042e68g5iovb1t",
      title: "Emerald Pendant 2",
      slug: "emerald-pendant-2",
      name,
      order: 0,
      galleryId: "cm901a4ce00032e684d6pz8ue",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Pendant 2" success!');
};

export const emerald_pendant_3 = async () => {
  const name = "002_emerald-pendant-3.jpeg";
  const path = "lainnya/cm8zzj7fb00002e68gubmouwg";

  await prisma.media.upsert({
    where: { id: "cm901irdl00052e68ksu298c4" },
    update: {},
    create: {
      id: "cm901irdl00052e68ksu298c4",
      title: "Emerald Pendant 3",
      slug: "emerald-pendant-3",
      name,
      order: 0,
      galleryId: "cm901a4ce00032e684d6pz8ue",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Pendant 3" success!');
};
