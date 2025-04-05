import { prisma } from "@/lib/prisma";

const ruby_ring_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm3cerfco0002dgfuxcukhnko" },
    update: {},
    create: {
      id: "cm3cerfco0002dgfuxcukhnko",
      title: "Cincin Batu Ruby",
      slug: "cincin-batu-ruby",
      color: "Merah Darah",
      state: "Burma",
      width: 12,
      height: 8,
      length: 12,
      weight: 20,
      price: 1000000,
      discount: 11,
      isFavorite: false,
      description: "Cincin Batu Ruby ini memiliki warna merah darah yang sangat cantik dan elegan.",
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ot82q0003gk84owcim11u",
    },
  });

  console.log('Seeding Product "Cincin Batu Ruby" success!');
};

const emerald_ring_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm93j2gzt00022e68tpvc9ll2" },
    update: {},
    create: {
      id: "cm93j2gzt00022e68tpvc9ll2",
      title: "Cincin Batu Emerald",
      slug: "cincin-batu-emerald",
      color: "Hijau lumut",
      state: "Brazil",
      width: 12,
      height: 10,
      length: 12,
      weight: 19,
      price: 1100000,
      discount: 10,
      isFavorite: true,
      description: "Cincin Batu Emerald ini memiliki warna hijau lumut yang sangat indah dan estetik.",
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Cincin Batu Emerald" success!');
};

const sapphire_ring_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm93jjd8100032e68mkc77xme" },
    update: {},
    create: {
      id: "cm93jjd8100032e68mkc77xme",
      title: "Cincin Batu Sapphire",
      slug: "cincin-batu-sapphire",
      color: "Biru Laut",
      state: "Madagascar",
      width: 12,
      height: 10,
      length: 12,
      weight: 19,
      price: 1250000,
      discount: 12.5,
      isFavorite: true,
      description: "Cincin Batu Sapphire ini memiliki warna biru laut yang gelap dan natural.",
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Cincin Batu Sapphire" success!');
};

export default { ruby_ring_stone, emerald_ring_stone, sapphire_ring_stone };
