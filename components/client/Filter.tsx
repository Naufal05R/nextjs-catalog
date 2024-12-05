"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Select } from "../server/Select";
import { readSlug } from "@/lib/utils";
import { ClearButton } from "./Button";
import { useState } from "react";

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
  const [value, setValue] = useState(selected);

  const handleFilter = useDebouncedCallback((term: "none" | (string & {})) => {
    params.set("page", "1");
    if (term && term !== "none") {
      params.set(field, term);
      setValue(term);
    } else if (term === "none") {
      setValue("");
      params.delete(field);
    } else {
      params.delete(field);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex items-center gap-4">
      <Select
        all
        data={data}
        side="bottom"
        value={"slug"}
        label={["title"]}
        selected={value ?? ""}
        onValueChange={(value) => handleFilter(value)}
        placeholder={`Filter by ${readSlug(field)}`}
        classNames={{
          trigger: "w-48 card-shadow transition-shadow duration-300 border-transparent",
          content: "card-shadow transition-shadow duration-300 border-transparent",
        }}
      />

      <ClearButton onClick={() => handleFilter("none")} />
    </div>
  );
};
