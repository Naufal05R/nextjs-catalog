import { EditNewsForm } from "@/components/client/Form";
import { getNews } from "@/lib/actions/news.action";
import { getNewsSrc } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function DetailNewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews({
    where: params,
  });

  if (!news) return notFound();

  const { title } = news;
  const articleSrc = getNewsSrc({ id: params.slug, resource: "article", exts: "mdx" });
  const markdown = await fetch(articleSrc).then((r) => r.text());

  if (!news || !markdown) return notFound();

  return (
    <section className="size-full p-4">
      <h4 className="text-2xl font-semibold capitalize">Update {title}</h4>

      <EditNewsForm news={news} text={markdown} />
    </section>
  );
}
