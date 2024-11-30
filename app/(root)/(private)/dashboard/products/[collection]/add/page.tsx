import { CreateProductForm } from "@/components/client/Form";
import { getAllCategory } from "@/lib/actions/category.action";

interface CreateProductPageProps {
  params: Promise<{ collection: string }>;
}

export default async function CreateProductPage({ params }: CreateProductPageProps) {
  const { collection } = await params;

  const categories = await getAllCategory();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Create new {collection} product</h4>

      <CreateProductForm collection={collection} categories={categories ?? []} />
    </section>
  );
}
