"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

  const handleFilter = (filter: "none" | (string & {})) => {
    params.set("page", "1");
    if (filter && filter !== "none") {
      params.set(field, filter);
      setValue(filter);
    } else if (filter === "none") {
      setValue("");
      params.delete(field);
    } else {
      params.delete(field);
    }

    replace(`${pathname}?${params.toString()}`);
  };

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
