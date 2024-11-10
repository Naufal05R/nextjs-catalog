import { prisma } from "@/lib/prisma";

export const sapphire = async () => {
  await prisma.category.upsert({
    where: { slug: "sapphire" },
    update: {},
    create: {
      title: "Shappire",
      slug: "sapphire",
      description: "Sapphire Category",
    },
  });

  console.log('Seeding Category "Shappire" success!');
};

export const ruby = async () => {
  await prisma.category.upsert({
    where: { slug: "ruby" },
    update: {},
    create: {
      title: "Ruby",
      slug: "ruby",
      description: "Ruby Category",
    },
  });

  console.log('Seeding Category "Ruby" success!');
};

export const crystal = async () => {
  await prisma.category.upsert({
    where: { slug: "crystal" },
    update: {},
    create: {
      title: "Crystal",
      slug: "crystal",
      description: "Crystal Category",
    },
  });

  console.log('Seeding Category "Crystal" success!');
};

export const emerald = async () => {
  await prisma.category.upsert({
    where: { slug: "emerald" },
    update: {},
    create: {
      title: "Emerald",
      slug: "emerald",
      description: "Emerald Category",
    },
  });

  console.log('Seeding Category "Emerald" success!');
};
