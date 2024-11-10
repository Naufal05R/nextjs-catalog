import { prisma } from "@/lib/prisma";

export const cincin = async () => {
  await prisma.collection.upsert({
    where: { slug: "cincin" },
    update: {},
    create: {
      title: "Cincin",
      slug: "cincin",
      description: "Collections of Cincin",
    },
  });

  console.log('Seeding Collection "Cincin" success!');
};

export const batu = async () => {
  await prisma.collection.upsert({
    where: { slug: "batu" },
    update: {},
    create: {
      title: "Batu",
      slug: "batu",
      description: "Collections of Batu",
    },
  });

  console.log('Seeding Collection "Batu" success!');
};
