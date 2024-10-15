import { padding } from "@/lib/styles";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <main className={cn(padding.x, "")}>
      <section className="flex flex-nowrap items-center gap-0">
        <figure className="relative h-96 w-2/3">
          <Image
            src="/dummy_1.jpg"
            alt="dummy image"
            fill
            className="size-full object-cover object-center"
          />
        </figure>
        <figure className="relative h-96 w-1/3">
          <Image
            src="/dummy_3.jpg"
            alt="dummy image"
            fill
            className="size-full object-cover object-center"
          />
        </figure>
      </section>
    </main>
  );
}
