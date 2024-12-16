import { DashboardProductDisplay } from "@/components/server/Product";
import { DashboardSkeleton } from "@/components/server/Skeleton";
import { getCollection } from "@/lib/actions/collection.action";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface ProductsByCollectionPageProps {
  params: Promise<{ collection: string }>;
}

export default async function ProductsByCollectionPage({ params }: ProductsByCollectionPageProps) {
  const { collection } = await params;

  if (!(await getCollection({ where: { slug: collection } }))) return notFound();

  return (
    <section className="grid size-full place-items-start">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardProductDisplay isReady collection={collection} />
      </Suspense>
    </section>
  );
}
