import { EmptyState } from "@/components/server/Empty";

export default function NotFound() {
  return (
    <section className="grid size-full place-items-center">
      <EmptyState title="Collection doesn't exist! Please create a new one!" />
    </section>
  );
}
