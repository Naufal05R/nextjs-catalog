import { BackEndNewsDisplay } from "@/components/server/News";

export default function DashboardNewsPage({}) {
  return (
    <section className="grid size-full place-items-start">
      <BackEndNewsDisplay />
    </section>
  );
}
