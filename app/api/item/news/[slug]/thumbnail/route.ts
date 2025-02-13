import { getNewsThumbnail } from "@/lib/actions/news.action";
import { extensionError } from "@/lib/utils/error";
import { ACCEPTED_IMAGE_EXTS } from "@/schema/media";
import { NextRequest } from "next/server";
import { z } from "zod";

interface Props {
  params: Promise<{ slug: string }>;
}

export const GET = async (request: NextRequest, { params }: Props) => {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const newsExts = searchParams.get("exts");

    const { data: exts } = z.enum(ACCEPTED_IMAGE_EXTS).safeParse(newsExts);

    if (!exts) throw new Error(extensionError(ACCEPTED_IMAGE_EXTS, JSON.stringify(newsExts)));

    const thumbnail = await getNewsThumbnail({ news: slug, exts });

    if (!thumbnail) throw new Error("Failed getting thumbnail!");

    const arrayBuffer = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${exts}`,
        "Content-Disposition": `attachment; filename="thumbnail.${exts}"`,
      },
    });
  } catch (error) {
    return Response.json(error);
  }
};
