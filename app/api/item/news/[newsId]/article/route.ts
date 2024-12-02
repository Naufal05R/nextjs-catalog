import { getNewsArticle } from "@/lib/actions/news.action";
import { ThumbnailIdentifier } from "@/types/thumbnail";

interface Props {
  params: Promise<Pick<ThumbnailIdentifier, "newsId">>;
}

export const GET = async ({ params }: Props) => {
  try {
    const { newsId } = await params;

    const markdown = await getNewsArticle(newsId);

    return Response.json(markdown, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
