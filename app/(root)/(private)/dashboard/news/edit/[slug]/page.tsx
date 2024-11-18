import { EditNewsForm } from "@/components/client/Form";
import { getNews } from "@/lib/actions/news.action";
import { notFound } from "next/navigation";

const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT;

export default async function DetailNewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews({
    where: params,
  });

  if (!news) return notFound();

  const { title } = news;
  const markdown = await fetch(`${S3_ENDPOINT}/news/${params.slug}/article.mdx`).then((r) => r.text());

  if (!news || !markdown) return notFound();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Update {title}</h4>

      <EditNewsForm news={news} text={markdown} />
    </section>
  );
}
