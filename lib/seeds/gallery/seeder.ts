import { prisma } from "@/lib/prisma";

export const cincin_surgawi = async () => {
  await prisma.gallery.upsert({
    where: { slug: "cincin-surgawi" },
    update: {},
    create: {
      id: "cm36umo0o000ama15bfkcepqz",
      title: "Cincin Surgawi",
      slug: "cincin-surgawi",
      productId: "cm36umo0n0008ma15w17agl6f",
    },
  });

  console.log('Seeding Gallery "Cincin Surgawi" success!');
};

export const cincin_abadi = async () => {
  await prisma.gallery.upsert({
    where: { slug: "cincin-abadi" },
    update: {},
    create: {
      id: "cm36utuy8000ima15zb7s2t7t",
      title: "Cincin Abadi",
      slug: "cincin-abadi",
      productId: "cm36utuy5000gma150ikuh9ia",
    },
  });

  console.log('Seeding Gallery "Cincin Abadi" success!');
};

export const cincin_kuno = async () => {
  await prisma.gallery.upsert({
    where: { slug: "cincin-kuno" },
    update: {},
    create: {
      id: "cm39h56uv00045qutpbqf967j",
      title: "Cincin Kuno",
      slug: "cincin-kuno",
      productId: "cm39h56un00025qut61f8phx5",
    },
  });

  console.log('Seeding Gallery "Cincin Kuno" success!');
};

export const gelang_baru = async () => {
  await prisma.gallery.upsert({
    where: { slug: "gelang-baru" },
    update: {},
    create: {
      id: "cm39hdrk70004107r25bmaeoo",
      title: "Gelang Baru",
      slug: "gelang-baru",
      productId: "cm39hdrk40002107rv7v7095p",
    },
  });

  console.log('Seeding Gallery "Gelang Baru" success!');
};

export const batu_emerald = async () => {
  await prisma.gallery.upsert({
    where: { slug: "batu-emerald" },
    update: {},
    create: {
      id: "cm39hj1tz00046xne7dub4tsa",
      title: "Batu Emerald",
      slug: "batu-emerald",
      productId: "cm39hj1tw00026xnea4y15n5t",
    },
  });

  console.log('Seeding Gallery "Batu Emerald" success!');
};

export const batu_surgawi = async () => {
  await prisma.gallery.upsert({
    where: { slug: "batu-surgawi" },
    update: {},
    create: {
      id: "cm39humvo000c6xne8djm036d",
      title: "Batu Surgawi",
      slug: "batu-surgawi",
      productId: "cm39humvl000a6xneg6wy8vkn",
    },
  });

  console.log('Seeding Gallery "Batu Surgawi" success!');
};

export const batu_ajaib = async () => {
  await prisma.gallery.upsert({
    where: { slug: "batu-ajaib" },
    update: {},
    create: {
      id: "cm39i2mjn0005la8wrddcbcss",
      title: "Batu Ajaib",
      slug: "batu-ajaib",
      productId: "cm39i2mjl0003la8wgk17zkgc",
    },
  });

  console.log('Seeding Gallery "Batu Ajaib" success!');
};

export const cincin_kristal = async () => {
  await prisma.gallery.upsert({
    where: { slug: "cincin-kristal" },
    update: {},
    create: {
      id: "cm3bc1wbg0005100ypaz8gr9a",
      title: "Cincin Kristal",
      slug: "cincin-kristal",
      productId: "cm3bc1wbd0003100yf9j4lumr",
    },
  });

  console.log('Seeding Gallery "Cincin Kristal" success!');
};
