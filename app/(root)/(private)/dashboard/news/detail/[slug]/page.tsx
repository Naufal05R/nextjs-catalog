import { Image } from "@/components/server/Media";
import { getNews } from "@/lib/actions/news.action";
import { getNewsSrc } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT;

export default async function DetailNewsPage({ params }: { params: { slug: string } }) {
  const news = await getNews({
    where: params,
  });

  if (!news) return notFound();

  const { title, description, updatedAt } = news;
  const thumbnailSrc = getNewsSrc({ id: params.slug, resource: "thumbnail" });
  const markdown = await fetch(`${S3_ENDPOINT}/news/${params.slug}/article`).then((r) => r.text());

  if (!news || !markdown) return notFound();

  return (
    <section className="mx-auto size-full max-w-5xl p-4">
      <h4 className="mb-2 text-4xl">{title}</h4>
      <p className="mb-4 text-base font-light text-slate-500">{description}</p>
      <p className="mb-8 text-xs font-light uppercase text-slate-500">
        AUTHOR · {new Date(updatedAt).toLocaleString().substring(0, new Date(updatedAt).toLocaleString().indexOf(","))}
      </p>

      <article className="leading-normal text-slate-800 [&_*]:list-inside [&_blockquote]:border-l-4 [&_blockquote]:bg-slate-100 [&_blockquote]:py-1 [&_blockquote]:pl-2.5 [&_blockquote]:text-base [&_blockquote]:text-slate-600 [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-2xl [&_h5]:text-xl [&_h6]:text-lg [&_ol]:list-decimal [&_ul]:list-disc">
        <Image
          src={thumbnailSrc}
          alt={params.slug}
          fill
          sizes="25vw"
          classNames={{ figure: "w-full aspect-video mb-16" }}
        />
        <MDXRemote source={markdown} />
      </article>
    </section>
  );
}
