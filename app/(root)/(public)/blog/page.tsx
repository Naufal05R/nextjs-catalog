import Media from "@/components/server/Image";
import Mapper from "@/components/server/Mapper";
import React from "react";

const BlogPage = () => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Blog</h4>

      <ul className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-12">
        <Mapper
          data={Array.from({ length: 12 })}
          render={() => (
            <li className="group col-span-4">
              <article className="w-full overflow-hidden rounded bg-inherit group-hover:cursor-pointer">
                <Media
                  src={`/dummy_1.jpg`}
                  alt={`dummy_1`}
                  fill
                  sizes="25vw"
                  classNames={{
                    figure: "w-full aspect-video rounded group-hover:rounded-b-none",
                    image: "group-hover:scale-125 transition-transform duration-500",
                  }}
                />

                <blockquote>
                  <h5 className="mt-2 text-xl">Langka dan Sulit Terbentuk, Bikin Batu Akik Bernilai Tinggi</h5>
                  <p className="mr-4 mt-4 line-clamp-2 w-full break-words text-sm text-gray-600">
                    Batu akik yang kini sedang populer sebagai aksesoris perhiasan memang dibanderol dengan harga tak
                    biasa. Namun, ternyata batu akik itu dibanderol dengan harga yang murah.
                  </p>
                </blockquote>

                <blockquote className="mt-4 text-right text-xs text-rose-400">
                  <time>{new Date().toLocaleDateString()}</time>
                </blockquote>
              </article>
            </li>
          )}
        />
      </ul>
    </section>
  );
};

export default BlogPage;

// class="mt-8 grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4"
