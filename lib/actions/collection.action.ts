import { CollectionFormSchema } from "@/schema/collection";
import { handlingError, slugify } from "../utils";
import { prisma } from "../prisma";

export const createCollection = async (prevState: string | undefined, formData: FormData) => {
  const raw = {
    title: formData.get("title"),
  };
  const validated = CollectionFormSchema.safeParse(raw);

  if (validated.success) {
    console.log(validated);

    try {
      const { title } = validated.data;
      const newCollection = await prisma.collection.create({
        data: {
          title,
          slug: slugify(title),
        },
      });

      return newCollection.title;
    } catch (error) {
      handlingError(error);
    }
  } else {
    handlingError(validated.error);
  }
};
