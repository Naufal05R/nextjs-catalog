import Image from "@/components/Image";
import Mapper from "@/components/Mapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCollection } from "@/lib/actions/collection.action";
import { getProducts } from "@/lib/actions/product.action";
import { cn, formatPrice } from "@/lib/utils";
import { Archive, Grid2x2Plus, Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductsByCollectionPage({ params }: { params: { collection: string } }) {
  const collectionId = await getCollection(params.collection, "slug").then((collection) => collection?.id);

  if (!collectionId) return notFound();

  const products = await getProducts(collectionId, "collectionId");

  return (
    <section className="grid size-full place-items-start">
      {!!products?.length ? (
        <ul className="grid w-full grid-cols-12 gap-4 px-4 pb-16">
          <Mapper
            data={products}
            render={({ title, price, state, discount, description, isReady }, i) =>
              isReady && (
                <Card className="col-span-12 h-fit min-h-full overflow-hidden sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-4">
                  <CardHeader>
                    <Image
                      src={`/dummy_${(i % 3) + 1}.jpg`}
                      alt="dummy_image"
                      fill
                      sizes="25vw"
                      classNames={{ figure: "w-full aspect-video rounded-md" }}
                    />
                  </CardHeader>

                  <CardContent>
                    <CardTitle className="line-clamp-1 whitespace-nowrap text-lg font-semibold">{title}</CardTitle>
                    <CardDescription className="mb-2 line-clamp-3">{description}</CardDescription>
                    <div className="ml-auto flex w-fit gap-2">
                      <Badge
                        variant={"secondary"}
                        className="bg-sky-100 text-sky-900 hover:bg-sky-100/80 dark:bg-sky-800 dark:text-sky-50 dark:hover:bg-sky-800/80"
                      >
                        Sapphire
                      </Badge>
                      <Badge
                        variant={"secondary"}
                        className="bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80"
                      >
                        {state} Origin
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className={cn("flex-1 justify-end", { "justify-between": !!discount })}>
                    {!!discount && (
                      <Badge variant={"outline"} className="border-rose-200 text-rose-500">
                        {discount}% OFF
                      </Badge>
                    )}
                    <div className="flex flex-col">
                      {!!discount && (
                        <CardDescription className="w-full text-right font-semibold line-through">
                          Rp. {formatPrice(price)}
                        </CardDescription>
                      )}
                      <CardTitle className="w-full text-right font-semibold">
                        Rp. {formatPrice(price * (1 - Math.min(Math.abs(discount ?? 0), 100) / 100))}
                      </CardTitle>
                    </div>
                  </CardFooter>

                  <CardFooter className="mt-auto gap-4">
                    <Button className="flex-1">
                      <Archive />
                      Archive
                    </Button>
                    <Button className="flex-1">
                      <Pencil />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              )
            }
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
