import { EditProductForm } from "@/components/client/Form";
import { getAllCategory } from "@/lib/actions/category.action";
import { getProduct, getProductMedia } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ collection: string; product: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { collection, product } = await params;

  const selectedProduct = await getProduct({ where: { slug: product } });

  if (!selectedProduct) return notFound();

  const categories = await getAllCategory();

  const defaultFiles = await Promise.all(
    selectedProduct.gallery!.medias.map(async ({ title, name, order }) => {
      const blob = await getProductMedia({ slug: product, name });
      if (!blob) throw new Error("Media not found!");
      const media = new File([blob], name, { type: blob.type });
      return { title, name, order, media };
    }),
  );

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Edit {selectedProduct.title} product</h4>

      <EditProductForm
        collection={collection}
        categories={categories ?? []}
        product={selectedProduct}
        defaultFiles={defaultFiles}
      />
    </section>
  );
}
