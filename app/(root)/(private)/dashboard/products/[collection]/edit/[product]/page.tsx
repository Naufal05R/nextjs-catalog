import { EditProductForm } from "@/components/client/Form";
import { getAllCategory } from "@/lib/actions/category.action";
import { getProduct } from "@/lib/actions/product.action";
import { getMediaSrc } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { collection: string; product: string } }) {
  const selectedProduct = await getProduct({ where: { slug: params.product } });

  if (!selectedProduct) return notFound();

  const categories = await getAllCategory();
  const defaultFiles =
    selectedProduct.gallery?.medias.map(({ title, name, order }) => ({ title, name, order, media: null })) ?? [];

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Create new {params.collection} product</h4>

      <EditProductForm
        collection={params.collection}
        categories={categories ?? []}
        product={selectedProduct}
        defaultFiles={defaultFiles}
      />
    </section>
  );
}
