import { fetcher } from "@/lib/utils";
import { MediaFormSchema } from "@/schema/media";
import useSWR from "swr";
import { z } from "zod";

interface DefaultFiles {
  title: string;
  name: string;
  order: number;
  media: File | null;
}

interface UseMediaProps {
  defaultFiles: DefaultFiles[];
  product: string;
}

export function useMedia({ defaultFiles, product }: UseMediaProps) {
  const {
    data: medias,
    error,
    isLoading,
  } = useSWR<z.infer<typeof MediaFormSchema>[], unknown>({ defaultFiles, product }, () => {
    return Promise.all(
      defaultFiles.map(async ({ title, name, order }) => {
        const blob = await fetcher.blob(`/api/item/product/${product}/media/${name}`);
        const media = new File([blob], name, { type: blob.type });
        return { title, order, media };
      }),
    );
  });

  return { medias, error, isLoading };
}
