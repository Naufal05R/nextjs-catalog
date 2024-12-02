import { getAllProduct } from "@/lib/actions/product.action";

export const GET = async () => {
  try {
    const products = await getAllProduct();

    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
