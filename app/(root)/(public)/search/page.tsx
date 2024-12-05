import { Search } from "@/components/client/Search";
import { SearchProductResult } from "@/components/server/Product";
import { Metadata } from "next";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams?: Promise<{ query?: string; page?: number }>;
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search everything in our store",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { /* page, */ query } = (await searchParams) ?? {};

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-xl">Search Everything</h4>

      <Search />

      <Suspense
        fallback={
          <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 xs:grid-cols-6 md:grid-cols-9 xl:grid-cols-12">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="col-span-3 aspect-[3/4] rounded bg-slate-200" />
            ))}
          </ul>
        }
      >
        <SearchProductResult query={query ?? ""} currentPage={1} />
      </Suspense>
    </section>
  );
}
