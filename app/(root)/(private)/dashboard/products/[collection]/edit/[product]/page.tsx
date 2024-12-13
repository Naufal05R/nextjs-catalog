import { EditProductForm } from "@/components/client/Form";
import { getAllCategory } from "@/lib/actions/category.action";
import { getProduct } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ collection: string; product: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { collection, product } = await params;

  const selectedProduct = await getProduct({ where: { slug: product } });

  if (!selectedProduct) return notFound();

  const categories = await getAllCategory();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Edit {selectedProduct.title} product</h4>

      <EditProductForm collection={collection} categories={categories ?? []} product={selectedProduct} />
    </section>
  );
}
