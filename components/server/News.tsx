import Link from "next/link";
import Mapper from "./Mapper";
import { Image } from "./Media";
import { getAllNews } from "@/lib/actions/news.action";
import { EmptyState } from "./Empty";

export const FrontEndNewsCard = async () => {
  const allNews = await getAllNews();

  return allNews && !!allNews.length ? (
    <ul className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12">
      <Mapper
        data={allNews}
        render={({ title, description, slug }) => (
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
                <time>{new Date().toLocaleDateString()}</time>
              </blockquote>
            </article>
          </Link>
        )}
      />
    </ul>
  ) : (
    <EmptyState title="News isn't availale!" />
  );
};

export const BackEndNewsCard = async () => {
  const allNews = await getAllNews();

  return allNews && !!allNews.length ? (
    <ul className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12">
      <Mapper
        data={allNews}
        render={({ title, description, slug }) => (
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
                <time>{new Date().toLocaleDateString()}</time>
              </blockquote>
            </article>
          </Link>
        )}
      />
    </ul>
  ) : (
    <div className="grid size-full place-items-center py-8">
      <h4 className="text-4xl font-semibold">News is&apos;nt available!</h4>
    </div>
  );
};
