import { getAllNews } from "@/lib/actions/news.action";

export const GET = async () => {
  try {
    const allNews = await getAllNews();

    return Response.json(allNews, { status: 200 });
  } catch (error) {
    return Response.json(error);
  }
};
