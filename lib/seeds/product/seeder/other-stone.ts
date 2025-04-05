import { prisma } from "@/lib/prisma";

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

export default { emerald_pendant_stone };
