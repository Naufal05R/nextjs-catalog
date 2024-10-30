import { CreateProductForm } from "@/components/client/Form";

export default function CreateProductPage({ params }: { params: { collection: string } }) {
  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Create new {params.collection} product</h4>

      <CreateProductForm />
    </section>
  );
}
