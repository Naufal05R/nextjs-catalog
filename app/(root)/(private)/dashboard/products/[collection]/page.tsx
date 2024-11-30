import { DashboardProductDisplay } from "@/components/server/Product";

interface ProductsByCollectionPageProps {
  params: Promise<{ collection: string }>;
}

export default async function ProductsByCollectionPage({ params }: ProductsByCollectionPageProps) {
  const { collection } = await params

  return (
    <section className="grid size-full place-items-start">
      <DashboardProductDisplay isReady collection={collection} />
    </section>
  );
}
