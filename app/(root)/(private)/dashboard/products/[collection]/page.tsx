import Link from "next/link";
import Mapper from "@/components/server/Mapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCollection } from "@/lib/actions/collection.action";
import { getAllProduct } from "@/lib/actions/product.action";
import { Grid2x2Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { DashbaordProductCard } from "@/components/server/Product";

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

          <Card className="relative col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
            <CardHeader className="invisible">
              <figure className="aspect-video w-full rounded-md"></figure>
            </CardHeader>
            <CardContent className="invisible">
              <CardTitle className="text-lg font-semibold">Invisible Title</CardTitle>
              <CardDescription className="mb-2 line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur unde, quidem amet labore quasi
                laboriosam placeat ut repellendus. Voluptatum velit optio repellat, cum tempora fuga harum aperiam
                provident voluptate dolorum! Architecto, harum?
              </CardDescription>
              <Badge>Invisible Badge</Badge>
            </CardContent>
            <CardFooter className="invisible">
              <div className="flex flex-col">
                <CardDescription className="w-full">Invisible Price</CardDescription>
                <CardTitle className="w-full">Invisible Price</CardTitle>
              </div>
            </CardFooter>
            <CardFooter className="invisible">
              <Button className="flex-1">Invisible Button</Button>
            </CardFooter>

            <Link
              href={`/dashboard/products/${params.collection}/add`}
              className="absolute inset-0 flex size-full flex-col items-center justify-center"
            >
              <Grid2x2Plus className="mx-auto" size={64} />
              <CardTitle className="mt-4 line-clamp-1 whitespace-nowrap text-xl font-semibold">
                Create new <span className="capitalize">{params.collection}</span>
              </CardTitle>
            </Link>
          </Card>
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
