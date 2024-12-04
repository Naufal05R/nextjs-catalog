import { fetcher } from "@/lib/utils";
import { Collection } from "@prisma/client";
import useSWR, { useSWRConfig } from "swr";

export function useCollection() {
  const {
    data: collections,
    error,
    mutate,
    isLoading,
  } = useSWR<Collection[], unknown>("/api/list/collection", fetcher.json);
  const { cache } = useSWRConfig();

  const refresh = () => {
    cache.delete("/api/list/collection");
    mutate();
  };

  return {
    collections,
    isLoading,
    refresh,
    error,
  };
}
