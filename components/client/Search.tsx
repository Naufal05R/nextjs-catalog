"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <article className="w-full">
      <fieldset className="flex flex-row flex-wrap rounded border border-slate-200 p-1 xs:flex-nowrap">
        <Label className="flex flex-1 origin-center flex-row items-center">
          <SearchIcon className="mx-2 text-slate-500" />
          <input
            className="w-full appearance-none bg-transparent py-2 text-sm font-light placeholder:text-sm focus:outline-none focus:ring-0"
            placeholder="Search our store"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Label>
      </fieldset>
    </article>
  );
};
