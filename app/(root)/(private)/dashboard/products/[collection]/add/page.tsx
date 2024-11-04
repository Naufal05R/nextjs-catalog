import { CreateProductForm } from "@/components/client/Form";
import { getAllCategory } from "@/lib/actions/category.action";

export default async function CreateProductPage({ params }: { params: { collection: string } }) {
  const categories = await getAllCategory();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Create new {params.collection} product</h4>

      <CreateProductForm collection={params.collection} categories={categories ?? []} />
    </section>
  );
}
