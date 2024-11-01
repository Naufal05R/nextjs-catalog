import Collection from "@/components/server/Collection";
import Mapper from "@/components/server/Mapper";
import { collections } from "@/constants";
import { getAllCollection } from "@/lib/actions/collection.action";

export default async function CollectionsPage() {
  const allCollections = await getAllCollection();

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

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
  );
}
