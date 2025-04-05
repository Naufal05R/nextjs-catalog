import { prisma } from "@/lib/prisma";

const kalung_keabadian = async () => {
  await prisma.product.upsert({
    where: { id: "cm8zzj7fb00002e68gubmouwg" },
    update: {},
    create: {
      id: "cm8zzj7fb00002e68gubmouwg",
      title: "Kalung Keabadian",
      slug: "kalung-keabadian",
      color: "Moss Green",
      state: "Raja Ampat",
      width: 11,
      height: 9,
      length: 10.5,
      weight: 24,
      price: 1150000,
      discount: 11,
      isFavorite: true,
      description: "This is Kalung Keabadian product coming from Lainnya collection",
      collectionId: "cm9015slt00012e68snz7ksb2",
      categoryId: "cm39i13s00000la8wdjqbz726",
    },
  });

  console.log('Seeding Product "Batu Crystal" success!');
};

export default { kalung_keabadian };
