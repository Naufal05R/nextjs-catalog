import { getAllCollection } from "@/lib/actions/collection.action";
import { handlingError } from "@/lib/utils";

export const GET = async () => {
  try {
    const collections = await getAllCollection();

    return Response.json({ success: true, data: collections }, { status: 200 });
  } catch (error) {
    handlingError(error);
  }
};
