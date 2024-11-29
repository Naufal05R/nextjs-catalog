import { MDXRemote } from "next-mdx-remote/rsc";
import { getNews } from "@/lib/actions/news.action";
import { notFound } from "next/navigation";
import { getNewsSrc } from "@/lib/utils";
import { Image } from "@/components/server/Media";

export default async function DetailNewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews({
    where: params,
  });

  if (!news) return notFound();

  const { title, description, updatedAt } = news;
  const articleSrc = getNewsSrc({ id: params.slug, resource: "article" });
  const thumbnailSrc = getNewsSrc({ id: params.slug, resource: "thumbnail" });
  const markdown = await fetch(articleSrc).then((r) => r.text());

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col">
      <h4 className="mb-2 text-4xl">{title}</h4>
      <p className="mb-4 text-base font-light text-slate-500">{description}</p>
      <p className="mb-8 text-xs font-light uppercase text-slate-500">
        AUTHOR · {new Date(updatedAt).toLocaleString().substring(0, new Date(updatedAt).toLocaleString().indexOf(","))}
      </p>
      <Image
        src={thumbnailSrc}
        alt={params.slug}
        fill
        sizes="25vw"
        classNames={{ figure: "w-full aspect-video mb-16" }}
      />
      <MDXRemote source={markdown} />
    </section>
  );
}
