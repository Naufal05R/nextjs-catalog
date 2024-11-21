import { prisma } from "@/lib/prisma";

export const shine = async () => {
  await prisma.tag.upsert({
    where: { id: "cm3qzgdg900002e67s8w57ei5" },
    update: {},
    create: {
      id: "cm3qzgdg900002e67s8w57ei5",
      title: "Shine",
      slug: "shine",
    },
  });

  console.log('Seeding Tag "Shine" success!');
};

export const sparkle = async () => {
  await prisma.tag.upsert({
    where: { id: "cm3qzhgv900012e67m8q70ayu" },
    update: {},
    create: {
      id: "cm3qzhgv900012e67m8q70ayu",
      title: "Sparkle",
      slug: "sparkle",
    },
  });

  console.log('Seeding Tag "Sparkle" success!');
};
