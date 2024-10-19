import Collection from "@/components/Collection";
import { collections } from "@/constants";

export default function CollectionsPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

      <ul className="flex flex-row flex-nowrap items-center gap-4">
        {collections.map(({ title, description, href }, collectionIndex) => (
          <Collection key={collectionIndex} title={title} description={description} href={href} />
        ))}
      </ul>
    </section>
  );
}
