import { getCollection } from "@/lib/actions/collection.action";
import { CatalogProductDisplay } from "@/components/server/Product";
import { Metadata, ResolvingMetadata } from "next";
import { Filter } from "@/components/client/Filter";
import { getAllCategory } from "@/lib/actions/category.action";

interface CollectionPageProps {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const notFoundMetadata: Metadata = {
    title: "Collection not found!",
    description: "Couldn't serve page for not existing product",
  };

  try {
    const slug = (await params).collection;
    const collection = await getCollection({ where: { slug } });

    if (!collection) return notFoundMetadata;

    const { openGraph } = await parent;

    return {
      title: collection.title,
      openGraph: {
        title: collection.title,
        description: collection.description,
        images: [...(openGraph?.images ?? [])],
      },
    };
  } catch (error) {
    console.error(error);
    return notFoundMetadata;
  }
}

const SelectCategory = async () => {
  const categories = await getAllCategory();
  return <Filter field="category" data={categories ?? []} />;
};

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const { collection } = await params;
  const { category } = await searchParams;

  const { title, description } = await getCollection({
    where: {
      slug: collection,
    },
  }).then((collection) => {
    if (collection) {
      return collection;
    } else {
      throw new Error("Collection not found");
    }
  });

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl capitalize">{title}</h4>
      <p className="mb-8 text-sm text-slate-500">{description}</p>

      <SelectCategory />

      <CatalogProductDisplay category={category} collection={collection} />
    </section>
  );
}
