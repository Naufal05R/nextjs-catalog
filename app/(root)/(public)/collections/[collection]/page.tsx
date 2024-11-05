import Product from "@/components/client/Product";
import Mapper from "@/components/server/Mapper";
import { Select } from "@/components/server/Select";
import { collections } from "@/constants";
import { getCollection } from "@/lib/actions/collection.action";
import { getAllProduct } from "@/lib/actions/product.action";

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const collection = await getCollection(params.collection, "slug").then((collection) => {
    if (collection) {
      return collection;
    } else {
      throw new Error("Collection not found");
    }
  });

  const allProducts = await getAllProduct(collection.id, "collectionId");

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl capitalize">{collection.title}</h4>
      <p className="mb-8 text-sm text-slate-500">{collection.description}</p>

      <Select
        data={collections}
        value={"title"}
        label={["title"]}
        placeholder="Filter Collection"
        classNames={{
          trigger: "w-48",
        }}
      />

      <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 xs:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
        {!!allProducts?.length && (
          <Mapper
            data={allProducts}
            render={(product) => (
              <Product
                {...product}
                collection={params.collection}
                thumbnail={product.gallery!.medias[0].name}
                classNames={{ wrapper: "col-span-3" }}
              />
            )}
          />
        )}
      </ul>
    </section>
  );
}
