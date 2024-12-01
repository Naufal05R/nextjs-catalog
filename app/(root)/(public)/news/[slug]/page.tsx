import { z } from "zod";
import { Image } from "@/components/server/Media";
import { getNews, getNewsArticle } from "@/lib/actions/news.action";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getNewsSrc } from "@/lib/utils";
import { ACCEPTED_IMAGE_EXTS } from "@/schema/media";
import { extensionError } from "@/lib/utils/error";

interface DetailNewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailNewsPage({ params }: DetailNewsPageProps) {
  const { slug } = await params;

  const news = await getNews({
    where: { slug },
  });

  if (!news || !news.thumbnail) return notFound();

  const { title, description, thumbnail, updatedAt } = news;

  const { data: exts } = z.enum(ACCEPTED_IMAGE_EXTS).safeParse(thumbnail.exts);

  if (!exts) throw new Error(extensionError(ACCEPTED_IMAGE_EXTS, thumbnail.exts));

  const thumbnailSrc = getNewsSrc({ newsId: news.id, resource: "thumbnail", resourceId: news.thumbnail.id, exts });
  const markdown = await getNewsArticle(news.id);

  if (!markdown) return notFound();

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col">
      <h4 className="mb-2 text-4xl">{title}</h4>
      <p className="mb-4 text-base font-light text-slate-500">{description}</p>
      <p className="mb-8 text-xs font-light uppercase text-slate-500">
        AUTHOR · {new Date(updatedAt).toLocaleString().substring(0, new Date(updatedAt).toLocaleString().indexOf(","))}
      </p>
      <Image src={thumbnailSrc} alt={slug} fill sizes="25vw" classNames={{ figure: "w-full aspect-video mb-16" }} />
      <MDXRemote source={markdown} />
    </section>
  );
}
