import { prisma } from "@/lib/prisma";

export const sapphire = async () => {
  await prisma.category.upsert({
    where: { id: "cm32ooxry0002gk847mqzh1to" },
    update: {},
    create: {
      id: "cm32ooxry0002gk847mqzh1to",
      title: "Shappire",
      slug: "sapphire",
      description: "Sapphire Category",
    },
  });

  console.log('Seeding Category "Shappire" success!');
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

export const crystal = async () => {
  await prisma.category.upsert({
    where: { id: "cm35mv1h500001z47i1pvnvnp" },
    update: {},
    create: {
      id: "cm35mv1h500001z47i1pvnvnp",
      title: "Crystal",
      slug: "crystal",
      description: "Crystal Category",
    },
  });

  console.log('Seeding Category "Crystal" success!');
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
