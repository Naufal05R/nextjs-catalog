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
      isFavorite: true,
      description: "Cincin Batu Ruby ini memiliki warna merah darah yang sangat cantik dan elegan.",
      collectionId: "cm2x7wgop0000w6g9yk4wa4yv",
      categoryId: "cm32ot82q0003gk84owcim11u",
    },
  });

  console.log('Seeding Product "Cincin Batu Ruby" success!');
};

export default { ruby_ring_stone };
