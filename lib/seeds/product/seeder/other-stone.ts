import { prisma } from "@/lib/prisma";

const aquamarine_bracelet_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm93m4nwy000e2e686n52aakj" },
    update: {},
    create: {
      id: "cm93m4nwy000e2e686n52aakj",
      title: "Gelang Batu Aquamarine",
      slug: "gelang-batu-aquamarine",
      color: "Biru Es",
      state: "Pakistan",
      width: 18,
      height: 9,
      length: 9,
      weight: 32,
      price: 2250000,
      discount: 0,
      isFavorite: false,
      description: "Gelang Batu Aquamarine ini memiliki warna biru es, tampak sangat jernih dan terang.",
      collectionId: "cm9015slt00012e68snz7ksb2",
      categoryId: "cm919z0y400012e68wu5jczxq",
    },
  });

  console.log('Seeding Product "Gelang Batu Aquamarine" success!');
};

const emerald_pendant_stone = async () => {
  await prisma.product.upsert({
    where: { id: "cm8zzj7fb00002e68gubmouwg" },
    update: {},
    create: {
      id: "cm8zzj7fb00002e68gubmouwg",
      title: "Liontin Batu Emerald",
      slug: "liontin-batu-emerald",
      color: "Hijau Lumut",
      state: "Zambia",
      width: 14,
      height: 9,
      length: 14,
      weight: 28,
      price: 1750000,
      discount: 12.5,
      isFavorite: true,
      description: "Liontin Batu Emerald ini memiliki warna hijau lumut yang sangat cantik dan natural.",
      collectionId: "cm9015slt00012e68snz7ksb2",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Liontin Batu Emerald" success!');
};

export default { emerald_pendant_stone, aquamarine_bracelet_stone };
