import { getNewsArticle } from "@/lib/actions/news.action";

interface Props {
  params: Promise<{ slug: string }>;
}

export const GET = async ({ params }: Props) => {
  try {
    const { slug } = await params;

    const markdown = await getNewsArticle(slug);

    return Response.json(markdown, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
