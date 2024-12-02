import { ThumbnailIdentifier } from "@/types/thumbnail";
import useSWR from "swr";

export function useThumbnail({ newsId, resourceId, exts }: ThumbnailIdentifier) {
  const {
    data: thumbnail,
    error,
    isLoading,
  } = useSWR<File>(`/api/item/news/${newsId}/thumbnail/${resourceId}?exts=${exts}`, async (key: string) => {
    const blob = await fetch(key).then((r) => r.blob());
    return new File([blob], "thumbnail", { type: blob.type });
  });

  return { thumbnail, error, isLoading };
}
