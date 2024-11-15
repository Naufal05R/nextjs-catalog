import Link from "next/link";
import Mapper from "./Mapper";
import { Image } from "./Media";
import { getAllNews } from "@/lib/actions/news.action";
import { EmptyState } from "./Empty";
import { News } from "@prisma/client";

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
    <ul className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12">
      <Mapper data={allNews} render={(news) => <BackEndNewsCard {...news} />} />
    </ul>
  ) : (
    <EmptyState title="News is empty, Please Create a new one!" href="/dashboard/news/add" alt="Write News" />
  );
};

export const BackEndNewsCard = ({ title, description, slug, updatedAt }: News) => {
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
