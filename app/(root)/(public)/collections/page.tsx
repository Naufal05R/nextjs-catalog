import { DynamicCollections } from "@/components/server/Collection";

export default function CollectionsPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

      <DynamicCollections />
    </section>
  );
}
