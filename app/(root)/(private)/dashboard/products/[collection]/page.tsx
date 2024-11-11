import Link from "next/link";
import Mapper from "@/components/server/Mapper";
import { Button } from "@/components/ui/button";
import { getCollection } from "@/lib/actions/collection.action";
import { getAllProduct } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import { CreateProductCard, DashbaordProductCard } from "@/components/server/Product";

export default async function ProductsByCollectionPage({ params }: { params: { collection: string } }) {
  const collectionId = await getCollection(params.collection, "slug").then((collection) => collection?.id);

  if (!collectionId) return notFound();

  const products = await getAllProduct({ where: { collectionId: collectionId, isReady: true } });

  return (
    <section className="grid size-full place-items-start">
      {!!products?.length ? (
        <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
          <Mapper
            data={products}
            render={({ gallery, ...product }) => {
              return (
                gallery && (
                  <DashbaordProductCard
                    {...product}
                    collection={params.collection}
                    thumbnail={gallery.medias[0].name}
                  />
                )
              );
            }}
          />

          <CreateProductCard collection={params.collection} />
        </ul>
      ) : (
        <article className="flex size-full flex-col items-center justify-center space-y-4">
          <h4 className="text-center text-3xl font-medium">
            There&apos;s no products exist <br /> in this collection
          </h4>
          <Button asChild>
            <Link href={`/dashboard/products/${params.collection}/add`}>Create a New Product</Link>
          </Button>
        </article>
      )}
    </section>
  );
}
