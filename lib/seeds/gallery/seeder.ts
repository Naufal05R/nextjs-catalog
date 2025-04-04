import { prisma } from "@/lib/prisma";

export const aquamarine_loose_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm3ceev1s0004dr9f0a1eazdw" },
    update: {},
    create: {
      id: "cm3ceev1s0004dr9f0a1eazdw",
      title: "Batu Lepas Aquamarine",
      slug: "batu-lepas-aquamarine",
      productId: "cm3ceev1q0002dr9fdnrukttj",
    },
  });

  console.log('Seeding Gallery "Batu Lepas Aquamarine" success!');
};

export const alexandrite_loose_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm91hn1vx00072e68qceo43o0" },
    update: {},
    create: {
      id: "cm91hn1vx00072e68qceo43o0",
      title: "Batu Lepas Alexandrite",
      slug: "batu-lepas-alexandrite",
      productId: "cm91h5eku00052e68p7coijs4",
    },
  });

  console.log('Seeding Gallery "Batu Lepas Alexandrite" success!');
};

export const ruby_loose_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm920xaue00022e68pt7qk0fx" },
    update: {},
    create: {
      id: "cm920xaue00022e68pt7qk0fx",
      title: "Batu Lepas Ruby",
      slug: "batu-lepas-ruby",
      productId: "cm920swb900012e68i2shpqgg",
    },
  });

  console.log('Seeding Gallery "Batu Lepas Ruby" success!');
};

export const sapphire_loose_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm922p0c8000e2e68dpsz7cmr" },
    update: {},
    create: {
      id: "cm922p0c8000e2e68dpsz7cmr",
      title: "Batu Lepas Sapphire",
      slug: "batu-lepas-sapphire",
      productId: "cm9229i80000d2e68hiwplhkp",
    },
  });

  console.log('Seeding Gallery "Batu Lepas Sapphire" success!');
};

export const emerald_loose_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm924gfsl000l2e68blkiimsl" },
    update: {},
    create: {
      id: "cm924gfsl000l2e68blkiimsl",
      title: "Batu Lepas Emerald",
      slug: "batu-lepas-emerald",
      productId: "cm923cvb9000j2e68ld476bdg",
    },
  });

  console.log('Seeding Gallery "Batu Lepas Emerald" success!');
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
