import { getNewsSrc } from "@/lib/utils";
import useSWR from "swr";

interface UseThumbnailProps {
  newsId: string;
  resourceId: string;
  exts: "jpeg" | "jpg" | "png" | "webp";
}

export function useThumbnail({ newsId, resourceId, exts }: UseThumbnailProps) {
  const {
    data: thumbnail,
    error,
    isLoading,
  } = useSWR({}, async () => {
    const thumbnailSrc = getNewsSrc({
      newsId,
      resource: "thumbnail",
      resourceId,
      exts,
    });
    const blob = await fetch(thumbnailSrc).then((r) => r.blob());
    return new File([blob], "thumbnail", { type: blob.type });
  });

  return { thumbnail, error, isLoading };
}
