import { Search } from "@/components/client/Search";
import { SearchProductResult } from "@/components/server/Product";
import { Metadata } from "next";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams?: Promise<{ query?: string; page?: number }>;
}

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { /* page, */ query } = (await searchParams) ?? {};

  return (
    <section className="pt-8">
      <h4 className="mb-4 text-xl">Search Everything</h4>

      <Search />

      <Suspense fallback={<>loading . . .</>}>
        <SearchProductResult query={query ?? ""} currentPage={1} />
      </Suspense>
    </section>
  );
}
