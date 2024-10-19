import Image from "@/components/Image";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

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
  );
}
