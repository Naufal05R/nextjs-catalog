import { DashboardProductDisplay } from "@/components/server/Product";

export default function ProductsByCollectionPage({ params }: { params: { collection: string } }) {
  return (
    <section className="grid size-full place-items-start">
      <DashboardProductDisplay isReady collection={params.collection} />
    </section>
  );
}
