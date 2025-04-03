import { prisma } from "@/lib/prisma";

export const sapphire = async () => {
  await prisma.category.upsert({
    where: { id: "cm32ooxry0002gk847mqzh1to" },
    update: {},
    create: {
      id: "cm32ooxry0002gk847mqzh1to",
      title: "Sapphire",
      slug: "sapphire",
      description: "Sapphire Category",
    },
  });

  console.log('Seeding Category "Sapphire" success!');
};

export const ruby = async () => {
  await prisma.category.upsert({
    where: { id: "cm32ot82q0003gk84owcim11u" },
    update: {},
    create: {
      id: "cm32ot82q0003gk84owcim11u",
      title: "Ruby",
      slug: "ruby",
      description: "Ruby Category",
    },
  });

  console.log('Seeding Category "Ruby" success!');
};

export const diamond = async () => {
  await prisma.category.upsert({
    where: { id: "cm35mv1h500001z47i1pvnvnp" },
    update: {},
    create: {
      id: "cm35mv1h500001z47i1pvnvnp",
      title: "Diamond",
      slug: "diamond",
      description: "Diamond Category",
    },
  });

  console.log('Seeding Category "Diamond" success!');
};

export const emerald = async () => {
  await prisma.category.upsert({
    where: { id: "cm39i13s00000la8wdjqbz726" },
    update: {},
    create: {
      id: "cm39i13s00000la8wdjqbz726",
      title: "Emerald",
      slug: "emerald",
      description: "Emerald Category",
    },
  });

  console.log('Seeding Category "Emerald" success!');
};

export const aquamarine = async () => {
  await prisma.category.upsert({
    where: { id: "cm919z0y400012e68wu5jczxq" },
    update: {},
    create: {
      id: "cm919z0y400012e68wu5jczxq",
      title: "Aquamarine",
      slug: "aquamarine",
      description: "Aquamarine Category",
    },
  });

  console.log('Seeding Category "Aquamarine" success!');
};

export const alexandrite = async () => {
  await prisma.category.upsert({
    where: { id: "cm91bwp4o00032e68g0mml66x" },
    update: {},
    create: {
      id: "cm91bwp4o00032e68g0mml66x",
      title: "Alexandrite",
      slug: "alexandrite",
      description: "Alexandrite Category",
    },
  });

  console.log('Seeding Category "Alexandrite" success!');
};

export const amethyst = async () => {
  await prisma.category.upsert({
    where: { id: "cm91ey3s800042e68zztbz36d" },
    update: {},
    create: {
      id: "cm91ey3s800042e68zztbz36d",
      title: "Amethyst",
      slug: "amethyst",
      description: "Amethyst Category",
    },
  });

  console.log('Seeding Category "Amethyst" success!');
};
