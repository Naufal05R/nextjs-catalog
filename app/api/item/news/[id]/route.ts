import { getNewsSrc } from "@/lib/utils";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const GET = async ({ params }: Props) => {
  try {
    const { id } = await params;

    const articleSrc = getNewsSrc({ newsId: id, resource: "article", exts: "mdx" });
    const markdown = await fetch(articleSrc).then((r) => r.text());

    return Response.json({ markdown }, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
