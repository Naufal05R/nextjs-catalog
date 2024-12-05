"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select } from "../server/Select";
import { readSlug } from "@/lib/utils";

interface FilterProps {
  field: "category" | (string & {});
  data: Record<"title" | "slug" | (string & {}), unknown>[];
}

export const Filter = ({ field, data }: FilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const selected = params.get(field);

  const handleSearch = useDebouncedCallback((term: "none" | (string & {})) => {
    params.set("page", "1");
    if (term) {
      params.set(field, term);
      if (term === "none") {
        params.delete(field);
      }
    } else {
      params.delete(field);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Select
      data={data}
      side="bottom"
      value={"slug"}
      label={["title"]}
      defaultValue={selected}
      onValueChange={(value) => handleSearch(value)}
      placeholder={`Filter by ${readSlug(field)}`}
      classNames={{
        trigger: "w-48 card-shadow transition-shadow duration-300 border-transparent",
        content: "card-shadow transition-shadow duration-300 border-transparent",
      }}
    />
  );
};
