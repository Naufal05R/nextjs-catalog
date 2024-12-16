import { BackEndNewsDisplay } from "@/components/server/News";
import { DashboardSkeleton } from "@/components/server/Skeleton";
import { Suspense } from "react";

export default function DashboardNewsPage({}) {
  return (
    <section className="grid size-full place-items-start">
      <Suspense fallback={<DashboardSkeleton />}>
        <BackEndNewsDisplay />
      </Suspense>
    </section>
  );
}
