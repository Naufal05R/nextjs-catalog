import { EmptyState } from "@/components/server/Empty";
import Mapper from "@/components/server/Mapper";
import { getAllNews } from "@/lib/actions/news.action";

export default async function DashboardNewsPage({}) {
  const allNews = await getAllNews();

  return (
    <section className="grid size-full place-items-start">
      {!!allNews?.length ? (
        <Mapper data={allNews} render={({ title }) => <div>{title}</div>} />
      ) : (
        <EmptyState title="News is empty, Please Create a new one!" href="/dashboard/news/add" alt="Write News" />
      )}
    </section>
  );
}
