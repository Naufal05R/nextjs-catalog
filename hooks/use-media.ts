"use client";

import { getMediaSrc } from "@/lib/utils";
import useSWR from "swr";

interface DefaultFiles {
  title: string;
  name: string;
  order: number;
  media: File | null;
}

interface UseMediaProps {
  defaultFiles: DefaultFiles[];
  collection: string;
  productId: string;
}

export function useMedia({ defaultFiles, productId, collection }: UseMediaProps) {
  const fetchMedia = async ({ productId, collection }: { productId: string; collection: string }) => {
    return await Promise.all(
      defaultFiles.map(async ({ title, name, order }) => {
        const src = getMediaSrc({ name, productId, collection });
        const blob = await fetch(src).then((r) => r.blob());
        const media = new File([blob], name, { type: blob.type });
        return { title, order, media };
      }),
    );
  };

  const { data: medias, error, isLoading } = useSWR({ productId, collection }, fetchMedia);

  return { medias, error, isLoading };
}
