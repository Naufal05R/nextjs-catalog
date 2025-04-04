import { prisma } from "@/lib/prisma";
import { uploadObject } from "@/lib/service";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
const STORAGE_URL = process.env.STORAGE_URL ?? "";

export const aquamarine_loose_stone_1 = async () => {
  const name = "000_aquamarine-loose-stone-1.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3ceev1t0005dr9f5dtcm651" },
    update: {},
    create: {
      id: "cm3ceev1t0005dr9f5dtcm651",
      title: "Aquamarine Loose Stone 1",
      slug: "aquamarine-loose-stone-1",
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

  console.log('Seeding Media "Aquamarine Loose Stone 1" success!');
};

export const aquamarine_loose_stone_2 = async () => {
  const name = "001_aquamarine-loose-stone-2.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cf9uvb00032e6605eyic55" },
    update: {},
    create: {
      id: "cm3cf9uvb00032e6605eyic55",
      title: "Aquamarine Loose Stone 2",
      slug: "aquamarine-loose-stone-2",
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

  console.log('Seeding Media "Aquamarine Loose Stone 2" success!');
};

export const aquamarine_loose_stone_3 = async () => {
  const name = "002_aquamarine-loose-stone-3.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cfc3ts00042e66z4yhlgqo" },
    update: {},
    create: {
      id: "cm3cfc3ts00042e66z4yhlgqo",
      title: "Aquamarine Loose Stone 3",
      slug: "aquamarine-loose-stone-3",
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

  console.log('Seeding Media "Aquamarine Loose Stone 3" success!');
};

export const alexandrite_loose_stone_1 = async () => {
  const name = "000_alexandrite-loose-stone-1.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91hih3o00062e68lbn2whiy" },
    update: {},
    create: {
      id: "cm91hih3o00062e68lbn2whiy",
      title: "Alexandrite Loose Stone 1",
      slug: "alexandrite-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 1" success!');
};

export const alexandrite_loose_stone_2 = async () => {
  const name = "001_alexandrite-loose-stone-2.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91jgjgh00082e68xvjfclbt" },
    update: {},
    create: {
      id: "cm91jgjgh00082e68xvjfclbt",
      title: "Alexandrite Loose Stone 2",
      slug: "alexandrite-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 2" success!');
};

export const alexandrite_loose_stone_3 = async () => {
  const name = "002_alexandrite-loose-stone-3.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91jisow00092e68h7htt3qa" },
    update: {},
    create: {
      id: "cm91jisow00092e68h7htt3qa",
      title: "Alexandrite Loose Stone 3",
      slug: "alexandrite-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 3" success!');
};

export const ruby_loose_stone_1 = async () => {
  const name = "000_ruby-loose-stone-1.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm9211uly00032e68rxn9gki9" },
    update: {},
    create: {
      id: "cm9211uly00032e68rxn9gki9",
      title: "Ruby Loose Stone 1",
      slug: "ruby-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 1" success!');
};

export const ruby_loose_stone_2 = async () => {
  const name = "001_ruby-loose-stone-2.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm921gymg00042e68tbirq3pl" },
    update: {},
    create: {
      id: "cm921gymg00042e68tbirq3pl",
      title: "Ruby Loose Stone 2",
      slug: "ruby-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 2" success!');
};

export const ruby_loose_stone_3 = async () => {
  const name = "002_ruby-loose-stone-3.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm921lstw000c2e68hwsr906o" },
    update: {},
    create: {
      id: "cm921lstw000c2e68hwsr906o",
      title: "Ruby Loose Stone 3",
      slug: "ruby-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 3" success!');
};

export const sapphire_loose_stone_1 = async () => {
  const name = "000_sapphire-loose-stone-1.jpeg";
  const path = "batu/cm9229i80000d2e68hiwplhkp";

  await prisma.media.upsert({
    where: { id: "cm922tvob000f2e68mtre49gf" },
    update: {},
    create: {
      id: "cm922tvob000f2e68mtre49gf",
      title: "Sapphire Loose Stone 1",
      slug: "sapphire-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm922p0c8000e2e68dpsz7cmr",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Loose Stone 1" success!');
};

export const sapphire_loose_stone_2 = async () => {
  const name = "001_sapphire-loose-stone-2.jpeg";
  const path = "batu/cm9229i80000d2e68hiwplhkp";

  await prisma.media.upsert({
    where: { id: "cm922wnte000g2e68h9s880ql" },
    update: {},
    create: {
      id: "cm922wnte000g2e68h9s880ql",
      title: "Sapphire Loose Stone 2",
      slug: "sapphire-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm922p0c8000e2e68dpsz7cmr",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Loose Stone 2" success!');
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
