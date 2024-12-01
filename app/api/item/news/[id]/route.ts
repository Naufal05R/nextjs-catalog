import { getNewsArticle } from "@/lib/actions/news.action";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async ({ params }: Props) => {
  try {
    const { id } = await params;

    const markdown = await getNewsArticle(id);

    return Response.json(markdown, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
