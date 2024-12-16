import Link from "next/link";
import Mapper from "./Mapper";
import { Image } from "./Media";
import { archiveNews, deleteNews, getAllNews, unarchiveNews } from "@/lib/actions/news.action";
import { EmptyState, EmptyStateWithButton } from "./Empty";
import { Prisma } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Archive, ArchiveRestore, FilePlus, Pencil, Trash2 } from "lucide-react";
import { getNewsSrc } from "@/lib/utils";
import { z } from "zod";
import { ACCEPTED_IMAGE_EXTS } from "@/schema/media";
import { extensionError } from "@/lib/utils/error";

export const FrontEndNewsDisplay = async () => {
  const allNews = await getAllNews();

  return allNews && !!allNews.length ? (
    <ul className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12">
      <Mapper data={allNews} render={(news) => <FrontEndNewsCard {...news} />} />
    </ul>
  ) : (
    <EmptyState title="News isn't availale!" />
  );
};

export const FrontEndNewsCard = ({
  id,
  title,
  description,
  slug,
  thumbnail,
  updatedAt,
}: Prisma.NewsGetPayload<{
  include: {
    thumbnail: true;
  };
}>) => {
  if (!thumbnail) throw new Error("News not found!");

  const timestamp = new Date(updatedAt).toLocaleDateString();
  const { data: exts } = z.enum(ACCEPTED_IMAGE_EXTS).safeParse(thumbnail.exts);

  if (!exts) throw new Error(extensionError(ACCEPTED_IMAGE_EXTS, thumbnail.exts));

  const src = getNewsSrc({ newsId: id, resource: "thumbnail", resourceId: thumbnail.id, exts });

  return (
    <Link href={`/news/${slug}`} className="group col-span-4">
      <article className="w-full overflow-hidden rounded bg-inherit group-hover:cursor-pointer">
        <Image
          src={src}
          alt={slug}
          fill
          sizes="25vw"
          classNames={{
            figure: "w-full aspect-video rounded",
            image: "group-hover:scale-125 transition-transform duration-500",
          }}
        />

        <blockquote>
          <h5 className="mt-2 text-xl font-medium">{title}</h5>
          <p className="mr-4 mt-4 line-clamp-2 w-full break-words text-sm text-gray-500">{description}</p>
        </blockquote>

        <blockquote className="mt-4 text-right text-xs text-rose-400">
          <time>{timestamp}</time>
        </blockquote>
      </article>
    </Link>
  );
};

export const BackEndNewsDisplay = async ({ isRelevant = true }: { isRelevant?: boolean }) => {
  const allNews = await getAllNews({ where: { isRelevant } });

  return allNews && !!allNews.length ? (
    <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
      <Mapper data={allNews} render={(news) => <BackEndNewsCard {...news} />} />

      <CreateNewsCard />
    </ul>
  ) : isRelevant ? (
    <EmptyStateWithButton title="News is empty, Please Create a new one!" href="/dashboard/news/add" alt="Write News" />
  ) : (
    <EmptyState title="Archived News is empty!" />
  );
};

export const BackEndNewsCard = ({
  id,
  title,
  description,
  slug,
  thumbnail,
  isRelevant,
  updatedAt,
}: Prisma.NewsGetPayload<{
  include: {
    thumbnail: true;
  };
}>) => {
  if (!thumbnail) throw new Error("News not found!");

  const timestamp = new Date(updatedAt).toLocaleDateString();
  const { data: exts } = z.enum(ACCEPTED_IMAGE_EXTS).safeParse(thumbnail.exts);

  if (!exts) throw new Error(extensionError(ACCEPTED_IMAGE_EXTS, thumbnail.exts));

  const thumbnailSrc = getNewsSrc({ newsId: id, resource: "thumbnail", resourceId: thumbnail.id, exts });

  return (
    <Card className="group col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
      <CardHeader>
        <Image
          src={thumbnailSrc}
          alt={slug}
          fill
          sizes="25vw"
          classNames={{
            figure: "w-full aspect-video rounded",
            image: "group-hover:scale-125 transition-transform duration-500",
          }}
        />
      </CardHeader>

      <CardContent>
        <CardTitle className="line-clamp-1 whitespace-nowrap text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="mb-2 line-clamp-3">{description}</CardDescription>
        <blockquote className="mt-4 text-right text-xs text-rose-400">
          <time>{timestamp}</time>
        </blockquote>
      </CardContent>

      <CardFooter className="mt-auto gap-4">
        <Button className="flex-1" form={`archive-news-${id}`}>
          <form id={`archive-news-${id}`} action={isRelevant ? archiveNews : unarchiveNews} className="hidden" />
          <input type="hidden" className="hidden" name="id" defaultValue={id} readOnly form={`archive-news-${id}`} />
          {isRelevant ? <Archive /> : <ArchiveRestore />}
          {isRelevant ? "Archive" : "Unarchive"}
        </Button>

        <Button asChild={isRelevant} className="flex-1" form={`delete-news-${id}`}>
          {isRelevant ? (
            <Link href={`/dashboard/news/edit/${slug}`}>
              <Pencil />
              Edit
            </Link>
          ) : (
            <>
              <form id={`delete-news-${id}`} action={deleteNews} className="hidden" />
              <input type="hidden" className="hidden" name="id" defaultValue={id} readOnly form={`delete-news-${id}`} />
              <Trash2 />
              Delete
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const CreateNewsCard = () => {
  return (
    <Card className="group relative col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
      <CardHeader className="invisible">
        <figure className="aspect-video w-full" />
      </CardHeader>

      <CardContent className="invisible">
        <CardTitle className="line-clamp-1 text-lg font-semibold">Invisible Title</CardTitle>
        <CardDescription className="mb-2 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur unde, quidem amet labore quasi
          laboriosam placeat ut repellendus. Voluptatum velit optio repellat, cum tempora fuga harum aperiam provident
          voluptate dolorum! Architecto, harum?
        </CardDescription>
        <blockquote className="mt-4 text-xs">
          <time>Invisible Date</time>
        </blockquote>
      </CardContent>

      <CardFooter className="invisible mt-auto gap-4">
        <Button className="flex-1" />
        <Button className="flex-1" />
      </CardFooter>

      <Link href="/dashboard/news/add" className="absolute inset-0 flex size-full flex-col items-center justify-center">
        <FilePlus className="mx-auto" size={64} />
        <CardTitle className="mt-4 line-clamp-1 whitespace-nowrap text-xl font-semibold">Create News</CardTitle>
      </Link>
    </Card>
  );
};
