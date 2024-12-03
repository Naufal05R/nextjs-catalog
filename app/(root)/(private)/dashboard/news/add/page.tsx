import { CreateNewsForm } from "@/components/client/Form";

export default function CreateNewsPage() {
  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Create news</h4>

      <CreateNewsForm />
    </section>
  );
}
