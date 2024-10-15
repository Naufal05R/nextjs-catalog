import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import Image from "@/components/Image";

export default function Home() {
  return (
    <main className={cn(padding.x, "")}>
      <section className="flex flex-nowrap items-center gap-0">
        <Image
          src="/dummy_1.jpg"
          alt="dummy_1"
          fill
          classNames={{ figure: "h-96 w-2/3" }}
        />

        <Image
          src="/dummy_2.jpg"
          alt="dummy_2"
          fill
          classNames={{ figure: "h-96 w-1/3" }}
        />
      </section>
    </main>
  );
}
