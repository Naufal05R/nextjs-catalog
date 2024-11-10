import { prisma } from "@/lib/prisma";

export const cincin = async () => {
  await prisma.collection.upsert({
    where: { slug: "cincin" },
    update: {},
    create: {
      id: "cm2x7wgop0000w6g9yk4wa4yv",
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
      id: "cm32yk6pa000fvlqxco3648rv",
      title: "Batu",
      slug: "batu",
      description: "Collections of Batu",
    },
  });

  console.log('Seeding Collection "Batu" success!');
};
