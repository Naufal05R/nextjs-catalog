import { prisma } from "@/lib/prisma";

const aquamarine_loose_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm3ceev1q0002dr9fdnrukttj" },
    update: {},
    create: {
      id: "cm3ceev1q0002dr9fdnrukttj",
      title: "Batu Lepas Aquamarine",
      slug: "batu-lepas-aquamarine",
      color: "Biru Terang",
      state: "Laut Merah",
      width: 12,
      height: 10,
      length: 9,
      weight: 22,
      price: 1250000,
      discount: 11.5,
      isFavorite: true,
      description: "Ini adalah Batu Lepas Aquamarine. Berwarna biru laut yang terang. Indah, bersinar dan berkilau",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm919z0y400012e68wu5jczxq",
    },
  });

  console.log('Seeding Product "Batu Lepas Aquamarine" success!');
};

const alexandrite_loose_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm91h5eku00052e68p7coijs4" },
    update: {},
    create: {
      id: "cm91h5eku00052e68p7coijs4",
      title: "Batu Lepas Alexandrite",
      slug: "batu-lepas-alexandrite",
      color: "Hijau kebiruan hingga merah keunguan",
      state: "Sri Lanka",
      width: 11,
      height: 9,
      length: 8.5,
      weight: 21,
      price: 1300000,
      discount: 9,
      isFavorite: true,
      description:
        "Ini adalah Batu Lepas Alexandrite. Menghasilkan warna biru keunguan di siang hari dan ungu kemerahan di malam hari.",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm91bwp4o00032e68g0mml66x",
    },
  });

  console.log('Seeding Product "Batu Lepas Alexandrite" success!');
};

const ruby_loose_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm920swb900012e68i2shpqgg" },
    update: {},
    create: {
      id: "cm920swb900012e68i2shpqgg",
      title: "Batu Lepas Ruby",
      slug: "batu-lepas-ruby",
      color: "Merah marun terang",
      state: "Burma",
      width: 10,
      height: 10,
      length: 10,
      weight: 20,
      price: 1000000,
      discount: 10,
      isFavorite: true,
      description: "Ini adalah Batu Lepas Ruby. Berwarna merah marun terang dengan kilau yang sangat menarik.",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm32ot82q0003gk84owcim11u",
    },
  });

  console.log('Seeding Product "Batu Lepas Ruby" success!');
};

const sapphire_loose_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm9229i80000d2e68hiwplhkp" },
    update: {},
    create: {
      id: "cm9229i80000d2e68hiwplhkp",
      title: "Batu Lepas Sapphire",
      slug: "batu-lepas-sapphire",
      color: "Biru Laut Terang",
      state: "Sri Lanka",
      width: 12,
      height: 7,
      length: 10,
      weight: 18,
      price: 1200000,
      discount: 7,
      isFavorite: true,
      description: "Ini adalah Batu Lepas Sapphire. Berwarna biru laut terang dengan kilau yang mempesona.",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Batu Lepas Sapphire" success!');
};

const emerald_loose_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm923cvb9000j2e68ld476bdg" },
    update: {},
    create: {
      id: "cm923cvb9000j2e68ld476bdg",
      title: "Batu Lepas Emerald",
      slug: "batu-lepas-emerald",
      color: "Hijau giok kegelapan",
      state: "Colombia",
      width: 11.5,
      height: 6,
      length: 9.5,
      weight: 16,
      price: 1450000,
      discount: 5,
      isFavorite: false,
      description: "Ini adalah Batu Lepas Emerald. Berwarna Hijau giok dengan kilau kegelapan yang estetik.",
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Batu Lepas Emerald" success!');
};

export default {
  aquamarine_loose_stone,
  alexandrite_loose_stone,
  ruby_loose_stone,
  sapphire_loose_stone,
  emerald_loose_stone,
};
