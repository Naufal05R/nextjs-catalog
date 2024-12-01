import { getAllCollection } from "@/lib/actions/collection.action";

export const GET = async () => {
  try {
    const collections = await getAllCollection();

    return Response.json(collections, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
