import { Search } from "@/components/client/Search";
import { SearchProductResult } from "@/components/server/Product";
import { Suspense } from "react";

export default function SearchPage({ searchParams }: { searchParams?: { query?: string; page?: number } }) {
  const query = searchParams?.query || "";
  const currentPage = searchParams?.page || 1;

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-xl">Search Everything</h4>

      <Search />

      <Suspense fallback={<></>}>
        <SearchProductResult query={query} currentPage={1} />
      </Suspense>
    </section>
  );
}
