import { prisma } from "@/lib/prisma";
import { uploadObject } from "@/lib/service";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
const STORAGE_URL = process.env.STORAGE_URL ?? "";

export const aquamarine_loose_stone_1 = async () => {
  const name = "000_aquamarine-loose-stone-1.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3ceev1t0005dr9f5dtcm651" },
    update: {},
    create: {
      id: "cm3ceev1t0005dr9f5dtcm651",
      title: "Aquamarine Loose Stone 1",
      slug: "aquamarine-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Aquamarine Loose Stone 1" success!');
};

export const aquamarine_loose_stone_2 = async () => {
  const name = "001_aquamarine-loose-stone-2.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cf9uvb00032e6605eyic55" },
    update: {},
    create: {
      id: "cm3cf9uvb00032e6605eyic55",
      title: "Aquamarine Loose Stone 2",
      slug: "aquamarine-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Aquamarine Loose Stone 2" success!');
};

export const aquamarine_loose_stone_3 = async () => {
  const name = "002_aquamarine-loose-stone-3.jpeg";
  const path = "batu/cm3ceev1q0002dr9fdnrukttj";

  await prisma.media.upsert({
    where: { id: "cm3cfc3ts00042e66z4yhlgqo" },
    update: {},
    create: {
      id: "cm3cfc3ts00042e66z4yhlgqo",
      title: "Aquamarine Loose Stone 3",
      slug: "aquamarine-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm3ceev1s0004dr9f0a1eazdw",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Aquamarine Loose Stone 3" success!');
};

export const alexandrite_loose_stone_1 = async () => {
  const name = "000_alexandrite-loose-stone-1.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91hih3o00062e68lbn2whiy" },
    update: {},
    create: {
      id: "cm91hih3o00062e68lbn2whiy",
      title: "Alexandrite Loose Stone 1",
      slug: "alexandrite-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 1" success!');
};

export const alexandrite_loose_stone_2 = async () => {
  const name = "001_alexandrite-loose-stone-2.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91jgjgh00082e68xvjfclbt" },
    update: {},
    create: {
      id: "cm91jgjgh00082e68xvjfclbt",
      title: "Alexandrite Loose Stone 2",
      slug: "alexandrite-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 2" success!');
};

export const alexandrite_loose_stone_3 = async () => {
  const name = "002_alexandrite-loose-stone-3.jpeg";
  const path = "batu/cm91h5eku00052e68p7coijs4";

  await prisma.media.upsert({
    where: { id: "cm91jisow00092e68h7htt3qa" },
    update: {},
    create: {
      id: "cm91jisow00092e68h7htt3qa",
      title: "Alexandrite Loose Stone 3",
      slug: "alexandrite-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm91hn1vx00072e68qceo43o0",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Alexandrite Loose Stone 3" success!');
};

export const ruby_loose_stone_1 = async () => {
  const name = "000_ruby-loose-stone-1.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm9211uly00032e68rxn9gki9" },
    update: {},
    create: {
      id: "cm9211uly00032e68rxn9gki9",
      title: "Ruby Loose Stone 1",
      slug: "ruby-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 1" success!');
};

export const ruby_loose_stone_2 = async () => {
  const name = "001_ruby-loose-stone-2.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm921gymg00042e68tbirq3pl" },
    update: {},
    create: {
      id: "cm921gymg00042e68tbirq3pl",
      title: "Ruby Loose Stone 2",
      slug: "ruby-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 2" success!');
};

export const ruby_loose_stone_3 = async () => {
  const name = "002_ruby-loose-stone-3.jpeg";
  const path = "batu/cm920swb900012e68i2shpqgg";

  await prisma.media.upsert({
    where: { id: "cm921lstw000c2e68hwsr906o" },
    update: {},
    create: {
      id: "cm921lstw000c2e68hwsr906o",
      title: "Ruby Loose Stone 3",
      slug: "ruby-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm920xaue00022e68pt7qk0fx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Loose Stone 3" success!');
};

export const sapphire_loose_stone_1 = async () => {
  const name = "000_sapphire-loose-stone-1.jpeg";
  const path = "batu/cm9229i80000d2e68hiwplhkp";

  await prisma.media.upsert({
    where: { id: "cm922tvob000f2e68mtre49gf" },
    update: {},
    create: {
      id: "cm922tvob000f2e68mtre49gf",
      title: "Sapphire Loose Stone 1",
      slug: "sapphire-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm922p0c8000e2e68dpsz7cmr",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Loose Stone 1" success!');
};

export const sapphire_loose_stone_2 = async () => {
  const name = "001_sapphire-loose-stone-2.jpeg";
  const path = "batu/cm9229i80000d2e68hiwplhkp";

  await prisma.media.upsert({
    where: { id: "cm922wnte000g2e68h9s880ql" },
    update: {},
    create: {
      id: "cm922wnte000g2e68h9s880ql",
      title: "Sapphire Loose Stone 2",
      slug: "sapphire-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm922p0c8000e2e68dpsz7cmr",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Loose Stone 2" success!');
};

export const sapphire_loose_stone_3 = async () => {
  const name = "002_sapphire-loose-stone-3.jpeg";
  const path = "batu/cm9229i80000d2e68hiwplhkp";

  await prisma.media.upsert({
    where: { id: "cm922yqtt000i2e68qvytrf5m" },
    update: {},
    create: {
      id: "cm922yqtt000i2e68qvytrf5m",
      title: "Sapphire Loose Stone 3",
      slug: "sapphire-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm922p0c8000e2e68dpsz7cmr",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Loose Stone 3" success!');
};

export const emerald_loose_stone_1 = async () => {
  const name = "000_emerald-loose-stone-1.jpeg";
  const path = "batu/cm923cvb9000j2e68ld476bdg";

  await prisma.media.upsert({
    where: { id: "cm924k4vv000n2e68ccjfx55h" },
    update: {},
    create: {
      id: "cm924k4vv000n2e68ccjfx55h",
      title: "Emerald Loose Stone 1",
      slug: "emerald-loose-stone-1",
      name,
      order: 0,
      galleryId: "cm924gfsl000l2e68blkiimsl",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Loose Stone 1" success!');
};

export const emerald_loose_stone_2 = async () => {
  const name = "001_emerald-loose-stone-2.jpeg";
  const path = "batu/cm923cvb9000j2e68ld476bdg";

  await prisma.media.upsert({
    where: { id: "cm924li1d000o2e68r64ex274" },
    update: {},
    create: {
      id: "cm924li1d000o2e68r64ex274",
      title: "Emerald Loose Stone 2",
      slug: "emerald-loose-stone-2",
      name,
      order: 1,
      galleryId: "cm924gfsl000l2e68blkiimsl",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Loose Stone 2" success!');
};

export const emerald_loose_stone_3 = async () => {
  const name = "002_emerald-loose-stone-3.jpeg";
  const path = "batu/cm923cvb9000j2e68ld476bdg";

  await prisma.media.upsert({
    where: { id: "cm924m8ey000p2e68f6jeva02" },
    update: {},
    create: {
      id: "cm924m8ey000p2e68f6jeva02",
      title: "Emerald Loose Stone 3",
      slug: "emerald-loose-stone-3",
      name,
      order: 2,
      galleryId: "cm924gfsl000l2e68blkiimsl",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Loose Stone 3" success!');
};

export const ruby_ring_stone_1 = async () => {
  const name = "000_ruby-ring-stone-1.jpeg";
  const path = "cincin/cm3cerfco0002dgfuxcukhnko";

  await prisma.media.upsert({
    where: { id: "cm3cfn31j00052e66x5zqmqn5" },
    update: {},
    create: {
      id: "cm3cfn31j00052e66x5zqmqn5",
      title: "Ruby Ring Stone 1",
      slug: "ruby-ring-stone-1",
      name,
      order: 0,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Ring Stone 1" success!');
};

export const ruby_ring_stone_2 = async () => {
  const name = "001_ruby-ring-stone-2.jpeg";
  const path = "cincin/cm3cerfco0002dgfuxcukhnko";

  await prisma.media.upsert({
    where: { id: "cm3cfnd8u00062e66au3qgzy9" },
    update: {},
    create: {
      id: "cm3cfnd8u00062e66au3qgzy9",
      title: "Ruby Ring Stone 2",
      slug: "ruby-ring-stone-2",
      name,
      order: 1,
      galleryId: "cm3cerfcq0004dgfumzio2iyj",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Ring Stone 2" success!');
};

export const emerald_ring_stone_1 = async () => {
  const name = "000_emerald-ring-stone-1.jpeg";
  const path = "cincin/cm93j2gzt00022e68tpvc9ll2";

  await prisma.media.upsert({
    where: { id: "cm93legr700082e68dcdhqpea" },
    update: {},
    create: {
      id: "cm93legr700082e68dcdhqpea",
      title: "Emerald Ring Stone 1",
      slug: "emerald-ring-stone-1",
      name,
      order: 0,
      galleryId: "cm93kddo700052e68fxn32j9r",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Ring Stone 1" success!');
};

export const emerald_ring_stone_2 = async () => {
  const name = "001_emerald-ring-stone-2.jpeg";
  const path = "cincin/cm93j2gzt00022e68tpvc9ll2";

  await prisma.media.upsert({
    where: { id: "cm93lfq3h00092e68dwyz65cv" },
    update: {},
    create: {
      id: "cm93lfq3h00092e68dwyz65cv",
      title: "Emerald Ring Stone 2",
      slug: "emerald-ring-stone-2",
      name,
      order: 1,
      galleryId: "cm93kddo700052e68fxn32j9r",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Ring Stone 2" success!');
};

export const sapphire_ring_stone_1 = async () => {
  const name = "000_sapphire-ring-stone-1.jpeg";
  const path = "cincin/cm93jjd8100032e68mkc77xme";

  await prisma.media.upsert({
    where: { id: "cm93lhrww000a2e68bxldwumt" },
    update: {},
    create: {
      id: "cm93lhrww000a2e68bxldwumt",
      title: "Sapphire Ring Stone 1",
      slug: "sapphire-ring-stone-1",
      name,
      order: 0,
      galleryId: "cm93knibb00062e681r22146p",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Ring Stone 1" success!');
};

export const sapphire_ring_stone_2 = async () => {
  const name = "001_sapphire-ring-stone-2.jpeg";
  const path = "cincin/cm93jjd8100032e68mkc77xme";

  await prisma.media.upsert({
    where: { id: "cm93ljf8y000b2e68nqqqtfo5" },
    update: {},
    create: {
      id: "cm93ljf8y000b2e68nqqqtfo5",
      title: "Sapphire Ring Stone 2",
      slug: "sapphire-ring-stone-2",
      name,
      order: 1,
      galleryId: "cm93knibb00062e681r22146p",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Sapphire Ring Stone 2" success!');
};

export const amethyst_ring_stone_1 = async () => {
  const name = "000_amethyst-ring-stone-1.jpeg";
  const path = "cincin/cm93jlm4n00042e68n7uf57k9";

  await prisma.media.upsert({
    where: { id: "cm93lm9lt000c2e68mkh6kqnh" },
    update: {},
    create: {
      id: "cm93lm9lt000c2e68mkh6kqnh",
      title: "Amethyst Ring Stone 1",
      slug: "amethyst-ring-stone-1",
      name,
      order: 0,
      galleryId: "cm93kpi9r00072e68i6joxrrx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Amethyst Ring Stone 1" success!');
};

export const amethyst_ring_stone_2 = async () => {
  const name = "001_amethyst-ring-stone-2.jpeg";
  const path = "cincin/cm93jlm4n00042e68n7uf57k9";

  await prisma.media.upsert({
    where: { id: "cm93lnvs7000d2e68tbvtf46a" },
    update: {},
    create: {
      id: "cm93lnvs7000d2e68tbvtf46a",
      title: "Amethyst Ring Stone 2",
      slug: "amethyst-ring-stone-2",
      name,
      order: 1,
      galleryId: "cm93kpi9r00072e68i6joxrrx",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Amethyst Ring Stone 2" success!');
};

export const aquamarine_bracelet_stone_1 = async () => {
  const name = "000_aquamarine-bracelet-stone-1.jpeg";
  const path = "lainnya/cm93m4nwy000e2e686n52aakj";

  await prisma.media.upsert({
    where: { id: "cm93s25o2000k2e688sssgi0x" },
    update: {},
    create: {
      id: "cm93s25o2000k2e688sssgi0x",
      title: "Aquamarine Bracelet Stone 1",
      slug: "aquamarine-bracelet-stone-1",
      name,
      order: 0,
      galleryId: "cm93rwrum000h2e686q2l9s1g",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Aquamarine Bracelet Stone 1" success!');
};

export const emerald_pendant_stone_1 = async () => {
  const name = "000_emerald-pendant-stone-1.jpeg";
  const path = "lainnya/cm8zzj7fb00002e68gubmouwg";

  await prisma.media.upsert({
    where: { id: "cm90187w900022e68j8gf8qf5" },
    update: {},
    create: {
      id: "cm90187w900022e68j8gf8qf5",
      title: "Emerald Pendant Stone 1",
      slug: "emerald-pendant-stone-1",
      name,
      order: 0,
      galleryId: "cm901a4ce00032e684d6pz8ue",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Emerald Pendant Stone 1" success!');
};

export const ruby_earrings_stone_1 = async () => {
  const name = "000_ruby-earrings-stone-1.jpeg";
  const path = "lainnya/cm93mdfg3000f2e68tvgi0xu3";

  await prisma.media.upsert({
    where: { id: "cm93s6s9j000l2e6849fid85n" },
    update: {},
    create: {
      id: "cm93s6s9j000l2e6849fid85n",
      title: "Ruby Earrings Stone 1",
      slug: "ruby-earrings-stone-1",
      name,
      order: 0,
      galleryId: "cm93rysxw000i2e688kzhmrdf",
    },
  });

  await uploadObject({
    bucketName: APP_NAME,
    objectName: `${path}/${name}`,
    filePath: `${STORAGE_URL}/${path}/${name}`,
  });

  console.log('Seeding Media "Ruby Earrings Stone 1" success!');
};
