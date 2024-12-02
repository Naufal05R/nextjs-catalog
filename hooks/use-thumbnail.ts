import { ACCEPTED_IMAGE_EXTS } from "@/schema/media";
import useSWR from "swr";

export function useThumbnail({ news, exts }: { news: string; exts: (typeof ACCEPTED_IMAGE_EXTS)[number] }) {
  const {
    data: thumbnail,
    error,
    isLoading,
  } = useSWR<File>(`/api/item/news/${news}/thumbnail?exts=${exts}`, async (key: string) => {
    const blob = await fetch(key).then((r) => r.blob());
    return new File([blob], "thumbnail", { type: blob.type });
  });

  return { thumbnail, error, isLoading };
}
