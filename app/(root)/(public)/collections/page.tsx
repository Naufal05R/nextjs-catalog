import { DynamicCollections } from "@/components/server/Collection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Find our product by collections",
};

export default function CollectionsPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

      <DynamicCollections />
    </section>
  );
}
