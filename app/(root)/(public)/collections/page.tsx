import Collection from "@/components/Collection";
import Image from "@/components/Image";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Our Collections</h4>

      <ul className="flex flex-row flex-nowrap items-center gap-4">
        {[
          {
            title: "Ring",
            description: "Sales words",
            href: "/collections/ring",
          },
          {
            title: "Necklace",
            description: "Sales words",
            href: "/collections/necklace",
          },
          {
            title: "Bracelets",
            description: "Sales words",
            href: "/collections/bracelets",
          },
        ].map(({ title, description, href }, collectionIndex) => (
          <Collection key={collectionIndex} title={title} description={description} href={href} />
        ))}
      </ul>
    </section>
  );
}
