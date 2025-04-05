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

export const ruby_ring_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm3cerfcq0004dgfumzio2iyj" },
    update: {},
    create: {
      id: "cm3cerfcq0004dgfumzio2iyj",
      title: "Cincin Batu Ruby",
      slug: "cincin-batu-ruby",
      productId: "cm3cerfco0002dgfuxcukhnko",
    },
  });

  console.log('Seeding Gallery "Cincin Batu Ruby" success!');
};

export const emerald_ring_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93kddo700052e68fxn32j9r" },
    update: {},
    create: {
      id: "cm93kddo700052e68fxn32j9r",
      title: "Cincin Batu Emerald",
      slug: "cincin-batu-emerald",
      productId: "cm93j2gzt00022e68tpvc9ll2",
    },
  });

  console.log('Seeding Gallery "Cincin Batu Emerald" success!');
};

export const sapphire_ring_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93knibb00062e681r22146p" },
    update: {},
    create: {
      id: "cm93knibb00062e681r22146p",
      title: "Cincin Batu Sapphire",
      slug: "cincin-batu-sapphire",
      productId: "cm93jjd8100032e68mkc77xme",
    },
  });

  console.log('Seeding Gallery "Cincin Batu Sapphire" success!');
};

export const amethyst_ring_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93kpi9r00072e68i6joxrrx" },
    update: {},
    create: {
      id: "cm93kpi9r00072e68i6joxrrx",
      title: "Cincin Batu Amethyst",
      slug: "cincin-batu-amethyst",
      productId: "cm93jlm4n00042e68n7uf57k9",
    },
  });

  console.log('Seeding Gallery "Cincin Batu Amethyst" success!');
};

export const aquamarine_bracelet_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93rwrum000h2e686q2l9s1g" },
    update: {},
    create: {
      id: "cm93rwrum000h2e686q2l9s1g",
      title: "Gelang Batu Aquamarine",
      slug: "gelang-batu-aquamarine",
      productId: "cm93m4nwy000e2e686n52aakj",
    },
  });

  console.log('Seeding Gallery "Gelang Batu Aquamarine" success!');
};

export const emerald_pendant_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm901a4ce00032e684d6pz8ue" },
    update: {},
    create: {
      id: "cm901a4ce00032e684d6pz8ue",
      title: "Liontin Batu Emerald",
      slug: "liontin-batu-emerald",
      productId: "cm8zzj7fb00002e68gubmouwg",
    },
  });

  console.log('Seeding Gallery "Liontin Batu Emerald" success!');
};

export const ruby_earrings_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93rysxw000i2e688kzhmrdf" },
    update: {},
    create: {
      id: "cm93rysxw000i2e688kzhmrdf",
      title: "Anting Batu Ruby",
      slug: "anting-batu-ruby",
      productId: "cm93mdfg3000f2e68tvgi0xu3",
    },
  });

  console.log('Seeding Gallery "Anting Batu Ruby" success!');
};

export const sapphire_brooch_stone = async () => {
  await prisma.gallery.upsert({
    where: { id: "cm93rzoh2000j2e68ok2lgdrr" },
    update: {},
    create: {
      id: "cm93rzoh2000j2e68ok2lgdrr",
      title: "Bros Batu Sapphire",
      slug: "bros-batu-sapphire",
      productId: "cm93mk5zq000g2e685gv2gmox",
    },
  });

  console.log('Seeding Gallery "Bros Batu Sapphire" success!');
};
