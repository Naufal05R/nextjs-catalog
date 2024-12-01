import { EditNewsForm } from "@/components/client/Form";
import { getNews, getNewsArticle } from "@/lib/actions/news.action";
import { notFound } from "next/navigation";

interface DetailNewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailNewsPage({ params }: DetailNewsPageProps) {
  const { slug } = await params;

  const news = await getNews({
    where: { slug },
  });

  if (!news) return notFound();

  const { title } = news;
  const markdown = await getNewsArticle(news.id);

  if (!news || !markdown) return notFound();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Update {title}</h4>

      <EditNewsForm news={news} text={markdown} />
    </section>
  );
}
