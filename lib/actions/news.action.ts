"use server";

import { NewsFormSchema } from "@/schema/news";
import { getFileMimeTypes, handlingError, initRawData, slugify } from "../utils";
import { createObject, deleteObjects } from "../service";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { News, Prisma } from "@prisma/client";
import { z } from "zod";

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
    });

    return news;
  } catch (error) {
    handlingError(error);
  }
};

export const createNews = async (prevState: z.ZodIssue[] | undefined, formData: FormData) => {
  const { data, error, success } = NewsFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { title, description, thumbnail, content } = data;
    let pathname = "";

    try {
      const imagesFile = data["images.file"];
      const imagesId = data["images.id"];
      let markdown = content;

      await prisma.$transaction(async (_prisma) => {
        if (thumbnail) {
          const { fileMime } = getFileMimeTypes(thumbnail.type);

          const arrayBuffer = await thumbnail.arrayBuffer();
          const objectStream = Buffer.from(arrayBuffer);

          await createObject({
            bucketName: APP_NAME,
            objectName: `news/${slugify(title)}/thumbnail.${fileMime}`,
            objectStream: objectStream,
          });
        }

        if (imagesFile && imagesId) {
          for (const [index, file] of imagesFile.entries()) {
            if (file) {
              const { fileMime } = getFileMimeTypes(file.type);
              const objectName = `news/${slugify(title)}/${imagesId[index]}.${fileMime}`;
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
          objectName: `news/${slugify(title)}/article.mdx`,
          objectStream: markdown,
        });

        await _prisma.news.create({
          data: {
            title,
            slug: slugify(title),
            description,
          },
        });
      });

      revalidatePath("/", "layout");
      pathname = `/dashboard/news/detail/${slugify(title)}`;
    } catch (error) {
      handlingError(error);
    } finally {
      redirect(pathname);
    }
  } else {
    return error.errors;
  }
};

export const updateNews = async (prevState: News | z.ZodIssue[], formData: FormData) => {
  if (prevState instanceof Array) return prevState;
  const { data, error, success } = NewsFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { title, description, content } = data;
    let pathname = "";

    try {
      const imagesFile = data["images.file"];
      const imagesId = data["images.id"];
      let markdown = content;

      const updatedNews = await prisma.$transaction(async (_prisma) => {
        if (imagesFile && imagesId) {
          for (const [index, file] of imagesFile.entries()) {
            if (file) {
              const { fileMime } = getFileMimeTypes(file.type);
              const objectName = `news/${slugify(title)}/${imagesId[index]}.${fileMime}`;
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

          await createObject({
            bucketName: APP_NAME,
            objectName: `news/${slugify(title)}/article.mdx`,
            objectStream: markdown,
          });
        }

        const _news = await _prisma.news.update({
          where: prevState,
          data: {
            title,
            slug: slugify(title),
            description,
          },
        });

        return _news;
      });

      revalidatePath("/", "layout");
      pathname = `/dashboard/news/detail/${prevState.slug}`;

      return updatedNews;
    } catch (error) {
      handlingError(error);
    } finally {
      redirect(pathname);
    }
  } else {
    return error.errors;
  }
};

export const archiveNews = async (formData: FormData) => {
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
