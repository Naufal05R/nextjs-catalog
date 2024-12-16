import { EmptyState } from "@/components/server/Empty";

export default function NotFound() {
  return (
    <section className="grid size-full place-items-center">
      <EmptyState title="Product doesn't exist!" />
    </section>
  );
}
