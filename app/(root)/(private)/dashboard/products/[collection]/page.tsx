import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProductsByCollectionPage({ params }: { params: { collection: string } }) {
  return (
    <section className="grid size-full place-items-center">
      <article className="flex flex-col items-center space-y-4">
        <h4 className="text-center text-3xl font-medium">
          There&apos;s no products exist <br /> in this collection
        </h4>
        <Button asChild>
          <Link href={`/dashboard/products/${params.collection}/add`}>Create a New Product</Link>
        </Button>
      </article>
    </section>
  );
}
