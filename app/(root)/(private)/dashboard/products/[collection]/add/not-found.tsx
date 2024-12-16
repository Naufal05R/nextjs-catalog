import { EmptyState } from "@/components/server/Empty";

export default function NotFound() {
  return (
    <section className="grid size-full place-items-center">
      <EmptyState title="Can't Create Product! Collection is'nt valid!" />
    </section>
  );
}
