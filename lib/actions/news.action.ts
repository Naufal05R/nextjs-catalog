"use server";

import { NewsFormSchema } from "@/schema/news";
import { getFileMimeTypes, getNewsSrc, handlingError, initRawData, slugify } from "../utils";
import { createObject, deleteObjects } from "../service";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { ACCEPTED_IMAGE_EXTS } from "@/schema/media";
import { handlingPrismaErrors } from "../prisma/error";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT ?? "";

interface GetNewsProps {
  where?: Prisma.NewsWhereInput;
}

export const getAllNews = async (params: GetNewsProps | undefined = undefined) => {
  const { where } = params ?? {};

  try {
    const allNews = await prisma.news.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        thumbnail: true,
      },
    });

    return allNews;
  } catch (error) {
    handlingError(error);
  }
};

export const getNews = async (params: GetNewsProps | undefined = undefined) => {
  const { where } = params ?? {};

  try {
    const news = await prisma.news.findFirst({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        thumbnail: true,
      },
    });

    return news;
  } catch (error) {
    handlingError(error);
  }
};

export const getNewsThumbnail = async ({
  news,
  exts,
}: {
  news: string;
  exts: (typeof ACCEPTED_IMAGE_EXTS)[number];
}) => {
  try {
    const selectedNews = await getNews({
      where: { slug: news },
    });

    if (!selectedNews || !selectedNews.thumbnail) throw new Error("Couldn't find the news!");

    const thumbnailSrc = getNewsSrc({
      newsId: selectedNews.id,
      resourceId: selectedNews.thumbnail.id,
      resource: "thumbnail",
      exts,
    });
    const blob = await fetch(thumbnailSrc, {
      headers: {
        "Content-Type": `image/${exts}`,
        "Content-Disposition": `attachment; filename="thumbnail.${exts}"`,
      },
    }).then((r) => r.blob());
    return blob;
  } catch (error) {
    handlingError(error);
  }
};

export const getNewsArticle = async (slug: string) => {
  try {
    const selectedNews = await getNews({ where: { slug } });

    if (!selectedNews) throw new Error("Couldn't find news!");

    const articleSrc = getNewsSrc({ newsId: selectedNews.id, resource: "article", exts: "mdx" });
    const markdown = await fetch(articleSrc).then((r) => r.text());

    return markdown;
  } catch (error) {
    handlingError(error);
  }
};

export const createNews = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to add news!");
  }

  const { data, error, success } = NewsFormSchema.omit({ id: true }).safeParse(initRawData(formData));

  if (success) {
    const { title, description, thumbnail, content } = data;

    try {
      const imagesFile = data["images.file"];
      const imagesId = data["images.id"];
      const newsId = crypto.randomUUID();
      let markdown = content;

      const news = await prisma.$transaction(async (_prisma) => {
        const _news = await _prisma.news.create({
          data: {
            id: newsId,
            title,
            slug: slugify(title),
            description,
          },
        });

        if (imagesFile && imagesId) {
          for (const [index, file] of imagesFile.entries()) {
            if (file) {
              const { fileMime } = getFileMimeTypes(file.type);
              const objectName = `news/${newsId}/${imagesId[index]}.${fileMime}`;
              const arrayBuffer = await file.arrayBuffer();
              const objectStream = Buffer.from(arrayBuffer);
              const objectParams = {
                bucketName: APP_NAME,
                objectName,
                objectStream,
              };

              await createObject(objectParams);
              markdown = markdown.replace(imagesId[index], `${S3_ENDPOINT}/${objectName}`);
            }
          }
        }

        await createObject({
          bucketName: APP_NAME,
          objectName: `news/${newsId}/article.mdx`,
          objectStream: markdown,
          objectMetaData: {
            "Content-Type": "text/markdown",
          },
        });

        if (thumbnail) {
          const thumbnailId = crypto.randomUUID();
          const { fileMime } = getFileMimeTypes(thumbnail.type);
          const image = new File([thumbnail], thumbnailId, { type: thumbnail.type });
          const arrayBuffer = await image.arrayBuffer();
          const objectStream = Buffer.from(arrayBuffer);

          await createObject({
            bucketName: APP_NAME,
            objectName: `news/${newsId}/thumbnail_${thumbnailId}.${fileMime}`,
            objectStream: objectStream,
            objectMetaData: {
              "Content-Type": thumbnail.type,
            },
          });

          await _prisma.thumbnail.create({
            data: {
              id: thumbnailId,
              newsId: newsId,
              exts: fileMime,
            },
          });
        }

        return _news;
      });

      revalidatePath("/", "layout");
      return news;
    } catch (error) {
      return handlingPrismaErrors(error);
    }
  } else {
    return error.errors;
  }
};

export const updateNews = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to update news!");
  }

  const { data, error, success } = NewsFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { id, title, description, thumbnail, content } = data;
    const slug = slugify(title);

    try {
      const imagesFile = data["images.file"];
      const imagesId = data["images.id"];
      let markdown = content;

      const news = await prisma.$transaction(async (_prisma) => {
        const _news = await _prisma.news.update({
          where: { id },
          data: {
            title,
            slug: slug,
            description,
          },
        });

        const oldThumbnail = await _prisma.thumbnail.findUnique({ where: { newsId: id } });

        if (thumbnail.name !== oldThumbnail?.id) {
          const thumbnailId = crypto.randomUUID();
          const { fileMime } = getFileMimeTypes(thumbnail.type);
          const image = new File([thumbnail], thumbnailId, { type: thumbnail.type });
          const arrayBuffer = await image.arrayBuffer();
          const objectStream = Buffer.from(arrayBuffer);

          await _prisma.news.update({
            where: { id },
            data: {
              thumbnail: {
                delete: { id: oldThumbnail?.id },
                create: {
                  id: thumbnailId,
                  exts: fileMime,
                },
              },
            },
          });

          deleteObjects({ bucketName: APP_NAME, prefix: `news/${id}/thumbnail_` });

          await createObject({
            bucketName: APP_NAME,
            objectName: `news/${id}/thumbnail_${thumbnailId}.${fileMime}`,
            objectStream: objectStream,
            objectMetaData: {
              "Content-Type": thumbnail.type,
            },
          });
        }

        if (imagesFile && imagesId) {
          for (const [index, file] of imagesFile.entries()) {
            if (file) {
              const { fileMime } = getFileMimeTypes(file.type);
              const objectName = `news/${id}/${imagesId[index]}.${fileMime}`;
              const arrayBuffer = await file.arrayBuffer();
              const objectStream = Buffer.from(arrayBuffer);
              const objectParams = {
                bucketName: APP_NAME,
                objectName,
                objectStream,
              };

              await createObject(objectParams);
              markdown = markdown.replace(imagesId[index], `${S3_ENDPOINT}/${objectName}`);
            }
          }
        }

        await createObject({
          bucketName: APP_NAME,
          objectName: `news/${id}/article.mdx`,
          objectStream: markdown,
          objectMetaData: {
            "Content-Type": "text/markdown",
          },
        });

        return _news;
      });

      revalidatePath("/", "layout");
      return news;
    } catch (error) {
      return handlingPrismaErrors(error);
    }
  } else {
    return error.errors;
  }
};

export const archiveNews = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to archive news!");
  }

  const id = formData.get("id") as string;

  if (id) {
    try {
      await prisma.news.update({
        where: {
          id,
        },
        data: {
          isRelevant: false,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      handlingError(error);
    }
  }
};

export const unarchiveNews = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to unarchive news!");
  }

  const id = formData.get("id") as string;

  if (id) {
    try {
      await prisma.news.update({
        where: {
          id,
        },
        data: {
          isRelevant: true,
        },
      });

      revalidatePath("/", "layout");
    } catch (error) {
      handlingError(error);
    }
  }
};

export const deleteNews = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be authorized to delete news!");
  }

  const id = formData.get("id") as string;

  if (id) {
    try {
      const selectedNews = await prisma.news.findUnique({
        where: {
          id,
        },
        select: {
          slug: true,
        },
      });

      if (selectedNews) {
        await prisma.$transaction(async (_prisma) => {
          await _prisma.news.delete({
            where: {
              id,
            },
          });

          deleteObjects({
            bucketName: APP_NAME,
            prefix: `news/${selectedNews.slug}/`,
          });
        });

        revalidatePath("/", "layout");
      } else {
        throw new Error("News not found!");
      }
    } catch (error) {
      handlingError(error);
    }
  }
};
