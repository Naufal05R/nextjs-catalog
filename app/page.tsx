import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import Image from "@/components/Image";
import { ChevronRight, Mail, Star } from "lucide-react";
import Link from "next/link";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main className={cn(padding.x, "")}>
      <section className="flex flex-nowrap items-center gap-px">
        <Image src="/dummy_1.jpg" alt="dummy_1" fill classNames={{ figure: "h-96 w-2/3" }} />

        <Image src="/dummy_2.jpg" alt="dummy_2" fill classNames={{ figure: "h-96 w-1/3" }} />
      </section>

      <section className="mt-16">
        <h4 className="mb-4 text-2xl">Shop out collections</h4>

        <ul className="flex flex-row flex-nowrap items-center gap-4">
          {Array.from({ length: 3 }).map((_, collectionIndex) => (
            <li key={collectionIndex} className="flex-1 overflow-hidden rounded">
              <picture className="grid grid-cols-3 grid-rows-2 gap-px">
                {Array.from({ length: 3 }).map((_, pictureIndex) => (
                  <Image
                    key={pictureIndex}
                    src={`/dummy_${pictureIndex + 1}.jpg`}
                    alt={`dummy_${pictureIndex + 1}`}
                    fill
                    classNames={{
                      figure: cn(pictureIndex ? "row-span-1 col-span-1" : "row-span-2 col-span-2", "aspect-square"),
                    }}
                  />
                ))}
              </picture>

              <figcaption className="mt-4 text-lg capitalize">collections</figcaption>
              <p className="mt-1 text-sm uppercase text-slate-500">sales words</p>
            </li>
          ))}
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
          {[
            {
              stars: 5,
              name: "Emily Toronto",
              citizen: "Canada",
              createdAt: "2023-July-10",
              comment:
                "Exceptional quality and stunning design, ideal for any occasion. I'm absolutely in love! ✨👌🏻🤍",
            },
            {
              stars: 5,
              name: "Mia Calgary",
              citizen: "Canada",
              createdAt: "2023-October-02",
              comment: "Absolutely beautiful! Just as shown, arrived quickly, and they're so charming.",
            },
            {
              stars: 5,
              name: "Gabriella Olivia",
              citizen: "New York",
              createdAt: "2023-September-05",
              comment:
                "These earrings are fantastic! I needed secure backs for my second holes, and these are the perfect fit—they look adorable!",
            },
          ].map((review, reviewIndex) => (
            <article key={reviewIndex} className="flex-1">
              <ul className="flex flex-row gap-1.5">
                {Array.from({ length: review.stars }).map((_, starIndex) => (
                  <li key={starIndex}>
                    <Star className="size-4 fill-amber-500 stroke-amber-500" />
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-slate-500">{review.comment}</p>
              <p className="mt-4 text-sm text-slate-500">
                {review.name}, {review.citizen}
              </p>
              <p className="text-xs text-slate-500">{review.createdAt}</p>
            </article>
          ))}
        </fieldset>
      </section>

      <section className="mt-16">
        <hgroup className="flex flex-row flex-nowrap justify-between">
          <h4 className="mb-4 text-2xl">Featured collections</h4>

          <Link href="/" className="flex flex-row items-center text-slate-500">
            <span className="text-sm">See all</span> <ChevronRight className="size-5" />
          </Link>
        </hgroup>

        <Carousel />
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
    </main>
  );
}
