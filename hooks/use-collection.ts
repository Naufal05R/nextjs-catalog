import { fetcher } from "@/lib/utils";
import { Collection } from "@prisma/client";
import useSWR from "swr";

export function useCollection() {
  const { data, error, isLoading } = useSWR<Collection[], unknown>("/api/list/collection", fetcher);

  console.log("data: ", data);

  return {
    collections: data,
    isLoading,
    error,
  };
}
