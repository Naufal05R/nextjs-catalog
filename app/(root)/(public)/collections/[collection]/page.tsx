import Mapper from "@/components/server/Mapper";
import { Select } from "@/components/server/Select";
import { collections } from "@/constants";
import { getCollection } from "@/lib/actions/collection.action";
import { getMediaSrc } from "@/lib/utils";
import { getAllProduct } from "@/lib/actions/product.action";
import { CatalogProductCard } from "@/components/server/Product";
import { Collection } from "@prisma/client";
import { Metadata, ResolvingMetadata } from "next";

interface CollectionPageProps {
  params: Promise<{ collection: string }>;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

export async function generateMetadata({ params }: CollectionPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const notFoundMetadata: Metadata = {
    title: "Collection not found!",
    description: "Couldn't serve page for not existing product",
  };

  try {
    const slug = (await params).collection;
    const collection = await getCollection({ where: { slug } });

    if (!collection) return notFoundMetadata;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: collection.title,
      openGraph: {
        title: collection.title,
        description: collection.description,
        images: [...previousImages],
      },
    };
  } catch (error) {
    console.error(error);
    return notFoundMetadata;
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${SERVER_URL}/api/list/collection`);

    if (!response.ok) throw new Error(`Fetching product failed: ${response.statusText}`);

    const collections: Collection[] = await response.json();

    if (!Array.isArray(collections)) throw new Error(`Received invalid data format: ${typeof collections}`);
    if (!!collections.length) return [];

    return collections.map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = await params;

  const { id, title, slug, description } = await getCollection({
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

  const allProducts = await getAllProduct({ where: { collectionId: id } });

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl capitalize">{title}</h4>
      <p className="mb-8 text-sm text-slate-500">{description}</p>

      <Select
        data={collections}
        side="bottom"
        value={"title"}
        label={["title"]}
        placeholder="Filter Collection"
        classNames={{
          trigger: "w-48 card-shadow transition-shadow duration-300 border-transparent",
          content: "card-shadow transition-shadow duration-300 border-transparent",
        }}
      />

      <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 xs:grid-cols-6 md:grid-cols-9 xl:grid-cols-12">
        {!!allProducts?.length && (
          <Mapper
            data={allProducts}
            render={({ category, gallery, ...product }) => {
              const src = getMediaSrc({
                productId: product.id,
                collection: slug,
                name: gallery!.medias[0].name,
              });

              return (
                <li className="col-span-3">
                  <CatalogProductCard
                    {...product}
                    prefix={`/collections/${slug}`}
                    category={category.title}
                    imageProps={{ src }}
                  />
                </li>
              );
            }}
          />
        )}
      </ul>
    </section>
  );
}
