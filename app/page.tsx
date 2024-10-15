import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import Image from "@/components/Image";

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
    </main>
  );
}
