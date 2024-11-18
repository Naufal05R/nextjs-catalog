import { getProduct } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { collection: string; product: string } }) {
  const selectedProduct = await getProduct({ where: { slug: params.product } });

  if (!selectedProduct) return notFound();

  return <>Edit Product {selectedProduct.title}</>;
}
