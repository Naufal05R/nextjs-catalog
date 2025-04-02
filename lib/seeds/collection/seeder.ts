import { prisma } from "@/lib/prisma";

export const batu = async () => {
  await prisma.collection.upsert({
    where: { id: "cm32yk6pa000fvlqxco3648rv" },
    update: {},
    create: {
      id: "cm32yk6pa000fvlqxco3648rv",
      title: "Batu",
      slug: "batu",
      description: "Koleksi Batu",
    },
  });

  console.log('Seeding Collection "Batu" success!');
};

export const cincin = async () => {
  await prisma.collection.upsert({
    where: { id: "cm2x7wgop0000w6g9yk4wa4yv" },
    update: {},
    create: {
      id: "cm2x7wgop0000w6g9yk4wa4yv",
      title: "Cincin",
      slug: "cincin",
      description: "Koleksi Cincin",
    },
  });

  console.log('Seeding Collection "Cincin" success!');
};

export const lainnya = async () => {
  await prisma.collection.upsert({
    where: { id: "cm9015slt00012e68snz7ksb2" },
    update: {},
    create: {
      id: "cm9015slt00012e68snz7ksb2",
      title: "Lainnya",
      slug: "lainnya",
      description: "Koleksi Lainnya",
    },
  });

  console.log('Seeding Collection "Lainnya" success!');
};
