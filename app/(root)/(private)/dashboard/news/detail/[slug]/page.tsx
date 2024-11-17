import { getNews } from "@/lib/actions/news.action";
import { notFound } from "next/navigation";

export default async function DetailNewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews({ where: { slug: params.slug } });

  if (!news) return notFound();

  console.log(news);

  return (
    <>
      Detail News Page
      {JSON.stringify(news)}
    </>
  );
}
