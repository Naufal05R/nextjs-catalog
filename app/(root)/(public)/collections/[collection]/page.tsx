import { Select } from "@/components/Select";
import { collections } from "@/constants";

export default function CollectionPage({ params }: { params: { collection: string } }) {
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
    </section>
  );
}
