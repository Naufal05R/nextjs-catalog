import Media from "@/components/Image";
import Link from "next/link";
import { CarouselFeatured, CarouselThumbnail } from "@/components/client/Carousel";
import { ChevronRight, Mail, Star } from "lucide-react";
import { collections, testimonials } from "@/constants";
import Mapper from "@/components/server/Mapper";
import { getAllProduct } from "@/lib/actions/product.action";
import { getAllCollection } from "@/lib/actions/collection.action";
import Collection from "@/components/server/Collection";

export default async function Home() {
  const allProducts = await getAllProduct();
  const allCollections = await getAllCollection();

  return (
    <>
      <section className="flex flex-nowrap items-stretch gap-px">
        {allCollections && <CarouselThumbnail data={allCollections} />}

        <Media src="/dummy_2.jpg" alt="dummy_2" fill classNames={{ figure: "h-96 rounded w-1/3" }} />
      </section>

      <section className="mt-16">
        <h4 className="mb-4 text-2xl">Shop our collections</h4>

        <ul className="grid grid-cols-12 items-center gap-4">
          <Mapper
            data={allCollections!.slice(0, 3) ?? collections}
            render={({ title, description, slug }) => (
              <Collection
                title={title}
                description={description ?? ""}
                href={`/collections/${slug}`}
                classNames={{ wrapper: "col-span-4" }}
              />
            )}
          />
        </ul>
      </section>

      <section className="mt-16 w-full bg-slate-200 p-8">
        <blockquote className="text-center">
          <h6 className="mb-4 text-lg">OUR PROMISE</h6>
          <p className="mb-1 text-sm font-light">
            We value the elegance of minimalist jewelry. That&apos;s why we stand by the phrase, &quot;Keep It
            Effortless.&quot;
          </p>{" "}
          <p className="text-sm font-light">
            We design premium-quality pieces at budget-friendly prices, perfect for everyday wear.
          </p>
        </blockquote>
      </section>

      <section className="mt-16">
        <h4 className="mb-4 text-2xl">Testimonials</h4>

        <fieldset className="flex flex-row flex-nowrap items-center gap-8">
          <Mapper
            data={testimonials}
            render={({ name, citizen, comment, stars, createdAt }) => (
              <article className="flex-1">
                <ul className="flex flex-row gap-1.5">
                  <Mapper
                    data={Array.from({ length: stars })}
                    render={() => (
                      <li>
                        <Star className="size-4 fill-amber-500 stroke-amber-500" />
                      </li>
                    )}
                  />
                </ul>

                <p className="mt-4 text-sm text-slate-500">{comment}</p>
                <p className="mt-4 text-sm text-slate-500">
                  {name}, {citizen}
                </p>
                <p className="text-xs text-slate-500">{createdAt}</p>
              </article>
            )}
          />
        </fieldset>
      </section>

      <section className="mt-16">
        <hgroup className="flex flex-row flex-nowrap justify-between">
          <h4 className="mb-4 text-2xl">Featured collections</h4>

          <Link href="/" className="flex flex-row items-center text-slate-500">
            <span className="text-sm">See all</span> <ChevronRight className="size-5" />
          </Link>
        </hgroup>

        {allProducts && <CarouselFeatured data={allProducts} />}
      </section>

      <section className="mt-16 w-full bg-slate-200 p-8">
        <h4 className="mb-4 text-lg">Join our mailing list</h4>
        <p className="mb-2.5 text-sm font-light">
          Get updates on exclusive offers, new arrivals, and discounts delivered straight to your inbox.
        </p>

        <form action="">
          <fieldset className="flex flex-row flex-nowrap rounded border border-slate-400 p-2">
            <label htmlFor="landingpage_subscribe" className="flex flex-1 origin-center flex-row items-center">
              <Mail className="mx-1 text-slate-800" />
              <input
                id="landingpage_subscribe"
                placeholder="Your email"
                type="text"
                className="w-full appearance-none bg-transparent text-sm font-light focus:outline-none focus:ring-0"
              />
            </label>

            <button className="rounded-sm bg-slate-800 px-4 py-2 text-slate-50">Submit</button>
          </fieldset>
        </form>
      </section>
    </>
  );
}
