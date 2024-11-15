import Link from "next/link";
import Mapper from "./Mapper";
import { Image } from "./Media";
import { getAllNews } from "@/lib/actions/news.action";
import { EmptyState } from "./Empty";
import { News } from "@prisma/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Archive, ArchiveRestore, Pencil } from "lucide-react";

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

export const FrontEndNewsCard = ({ title, description, slug, updatedAt }: News) => {
  const timestamp = new Date(updatedAt).toLocaleDateString();

  return (
    <Link href={`/news/${slug}`} className="group col-span-4">
      <article className="w-full overflow-hidden rounded bg-inherit group-hover:cursor-pointer">
        <Image
          src={`/dummy_1.jpg`}
          alt={`dummy_1`}
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

export const BackEndNewsDisplay = async () => {
  const allNews = await getAllNews();

  return allNews && !!allNews.length ? (
    <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
      <Mapper data={allNews} render={(news) => <BackEndNewsCard {...news} />} />
    </ul>
  ) : (
    <EmptyState title="News is empty, Please Create a new one!" href="/dashboard/news/add" alt="Write News" />
  );
};

export const BackEndNewsCard = ({ title, description, updatedAt }: News) => {
  const timestamp = new Date(updatedAt).toLocaleDateString();

  return (
    <Card className="group col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
      <CardHeader>
        <Image
          src={`/dummy_1.jpg`}
          alt={`dummy_1`}
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
        <Button className="flex-1" form="archive-news">
          {/* <form id="archive-news" action={isReady ? archiveNews : unarchiveNews} className="hidden" /> */}
          {/* <input type="hidden" className="hidden" name="id" defaultValue={id} readOnly form="archive-news" /> */}
          {/* {isReady ? <Archive /> : <ArchiveRestore />} */}
          {/* {isReady ? "Archive" : "Unarchive"} */}
          <Archive />
          Archive
        </Button>

        <Button /* asChild={isReady} */ className="flex-1" form="delete-product">
          {/* {isReady ? (
            <Link href={`/dashboard/products/${collection}/${slug}`}>
              <Pencil />
              Edit
            </Link>
          ) : (
            <>
              <form id="delete-product" action={deleteProduct} className="hidden" />
              <input type="hidden" className="hidden" name="id" defaultValue={id} readOnly form="delete-product" />
              <Trash2 />
              Delete
            </>
          )} */}
          <Pencil />
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
