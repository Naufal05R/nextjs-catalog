import Product from "@/components/client/Product";
import Mapper from "@/components/server/Mapper";
import { Select } from "@/components/server/Select";
import { collections } from "@/constants";
import { getAllProduct } from "@/lib/actions/product.action";

export default async function CollectionPage({ params }: { params: { collection: string } }) {
  const allProducts = await getAllProduct();

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl capitalize">{params.collection}</h4>
      <p className="mb-8 text-sm text-slate-500">
        Experience timeless beauty with our Collection, where classic charm meets modern craftsmanship. Each piece is
        meticulously <br /> designed and handcrafted to embody enduring sophistication.
      </p>

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
              <Product {...product} collection={params.collection} classNames={{ wrapper: "col-span-3" }} />
            )}
          />
        )}
      </ul>
    </section>
  );
}
