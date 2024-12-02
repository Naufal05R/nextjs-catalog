import { getProduct, getProductMedia } from "@/lib/actions/product.action";
import { handlingError } from "@/lib/utils";

interface Props {
  params: Promise<{
    slug: string;
    name: string;
  }>;
}

export const GET = async (request: Request, { params }: Props) => {
  try {
    const { slug, name } = await params;

    const product = await getProduct({ where: { slug } });

    if (!product) throw new Error("Couldn't find product!");

    const media = await getProductMedia({ slug, name });

    if (!media) throw new Error("Media not found!");

    const arrayBuffer = await media.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": media.type,
        "Content-Disposition": `attachment; filename="${name}"`,
      },
    });
  } catch (error) {
    handlingError(error);
    return Response.json(error);
  }
};
