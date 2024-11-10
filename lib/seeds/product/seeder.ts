import { prisma } from "@/lib/prisma";

export const cincin_surgawi = async () => {
  await prisma.product.upsert({
    where: { slug: "cincin-surgawi" },
    update: {},
    create: {
      id: "cm36utuy5000gma150ikuh9ia",
      title: "Cincin Surgawi",
      slug: "cincin-surgawi",
      state: "Papua",
      width: 8,
      height: 7,
      length: 9,
      weight: 22,
      color: "Midnight Blue",
      price: 1_250_000,
      discount: 2,
      description: "This is Cincin Surgawi and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Cincin Surgawi" success!');
};

export const cincin_abadi = async () => {
  await prisma.product.upsert({
    where: { slug: "cincin-abadi" },
    update: {},
    create: {
      id: "cm39h56un00025qut61f8phx5",
      title: "Cincin Abadi",
      slug: "cincin-abadi",
      state: "Majapahit",
      width: 8,
      height: 7,
      length: 9,
      weight: 18,
      color: "Synthetic Orange",
      price: 1_250_000,
      discount: 11.5,
      description: "This is Cincin Abadi and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Cincin Abadi" success!');
};

export const cincin_kuno = async () => {
  await prisma.product.upsert({
    where: { slug: "cincin-kuno" },
    update: {},
    create: {
      id: "cm39hdrk40002107rv7v7095p",
      title: "Cincin Kuno",
      slug: "cincin-kuno",
      state: "Papua",
      width: 12,
      height: 8,
      length: 9,
      weight: 18,
      color: "Abstract Yellow",
      price: 2_450_000,
      discount: 2.5,
      description: "This is Cincin Kuno and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ot82q0003gk84owcim11u",
    },
  });

  console.log('Seeding Product "Cincin Kuno" success!');
};

export const gelang_baru = async () => {
  await prisma.product.upsert({
    where: { slug: "gelang-baru" },
    update: {},
    create: {
      id: "cm3bc1wbd0003100yf9j4lumr",
      title: "Gelang Baru",
      slug: "gelang-baru",
      state: "Papua",
      width: 8,
      height: 11,
      length: 14,
      weight: 18,
      color: "Midnight Blue",
      price: 1_250_000,
      discount: 10,
      description: "This is Gelang Baru and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm3bbz5au0000100yvpyksx8n",
      categoryId: "cm32ooxry0002gk847mqzh1to",
    },
  });

  console.log('Seeding Product "Gelang Baru" success!');
};

export const batu_emerald = async () => {
  await prisma.product.upsert({
    where: { slug: "batu-emerald" },
    update: {},
    create: {
      id: "cm39i2mjl0003la8wgk17zkgc",
      title: "Batu Emerald",
      slug: "batu-emerald",
      state: "Jepang",
      width: 8,
      height: 13,
      length: 9,
      weight: 26,
      color: "Abstract Yellow",
      price: 1_250_000,
      discount: 10,
      description: "This is Batu Emerald and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Batu Emerald" success!');
};

export const batu_surgawi = async () => {
  await prisma.product.upsert({
    where: { slug: "batu-surgawi" },
    update: {},
    create: {
      id: "cm39humvl000a6xneg6wy8vkn",
      title: "Batu Surgawi",
      slug: "batu-surgawi",
      state: "Europe",
      width: 14,
      height: 13,
      length: 15,
      weight: 26,
      color: "Seamless White",
      price: 2_750_000,
      discount: 7.5,
      description: "This is Batu Surgawi and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm35mv1h500001z47i1pvnvnp",
    },
  });

  console.log('Seeding Product "Batu Surgawi" success!');
};

export const batu_ajaib = async () => {
  await prisma.product.upsert({
    where: { slug: "batu-ajaib" },
    update: {},
    create: {
      id: "cm39hj1tw00026xnea4y15n5t",
      title: "Batu Ajaib",
      slug: "batu-ajaib",
      state: "Saudi",
      width: 8,
      height: 7,
      length: 13,
      weight: 24,
      color: "Seamless White",
      price: 1_850_000,
      discount: 10,
      description: "This is Batu Ajaib and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm32yk6pa000fvlqxco3648rv",
      categoryId: "cm35mv1h500001z47i1pvnvnp",
    },
  });

  console.log('Seeding Product "Batu Ajaib" success!');
};

export const cincin_kristal = async () => {
  await prisma.product.upsert({
    where: { slug: "cincin-kristal" },
    update: {},
    create: {
      id: "cm36umo0n0008ma15w17agl6f",
      title: "Cincin Kristal",
      slug: "cincin-kristal",
      state: "Kalimalang",
      width: 12,
      height: 10,
      length: 9,
      weight: 24,
      color: "Seamless White",
      price: 1_250_000,
      discount: 2.5,
      description: "This is Cincin Kristal and this is one of the most valuable product from cincin collection",
      isReady: true,
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm35mv1h500001z47i1pvnvnp",
    },
  });

  console.log('Seeding Product "Cincin Kristal" success!');
};
