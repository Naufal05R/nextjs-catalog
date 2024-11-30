import { EmptyStateWithButton } from "@/components/server/Empty";

export default function NotFound() {
  return (
    <section className="grid size-full place-items-center">
      <EmptyStateWithButton title="News not found!" href="/dashboard/news/" alt="Go to News Page" />
    </section>
  );
}
