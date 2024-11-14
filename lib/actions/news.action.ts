"use server";

import { NewsFormSchema } from "@/schema/news";
import { getFileMimeTypes, handlingError, initRawData, slugify } from "../utils";
import { createObject } from "../service";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
const S3_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT ?? "";

export const createNews = async (formData: FormData) => {
  const { data, error, success } = NewsFormSchema.safeParse(initRawData(formData));

  if (success) {
    const { title, description, content } = data;

    try {
      const imagesFile = data["images.file"];
      const imagesId = data["images.id"];
      let markdown = content;

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
          objectName: `news/${slugify(title)}/index.md`,
          objectStream: markdown,
        });
      }
    } catch (error) {
      handlingError(error);
    }
  } else {
    console.log(error);
  }
};
