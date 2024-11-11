import { EmptyState } from "@/components/server/Empty";

export default function DashboardNewsPage({}) {
  return (
    <section className="grid size-full place-items-start">
      <EmptyState title="News is empty, Please Create a new one!" href="/dashboard/products" alt="Write News" />
    </section>
  );
}
