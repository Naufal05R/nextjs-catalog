import { prisma } from "@/lib/prisma";
import { handlingError } from "@/lib/utils";

export const GET = async () => {
  try {
    const collections = await prisma.collection.findMany();

    return Response.json({ success: true, data: collections }, { status: 200 });
  } catch (error) {
    handlingError(error);
  }
};
