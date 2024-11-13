import { z } from "zod";
import { Dataset } from "@/types/data";
import { MediaFormSchema } from "@/schema/media";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_S3_ENDPOINT;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

export function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function padValue(value: number) {
  return String(value).padStart(3, "0");
}

export function defineConst<T extends Dataset>(fields: T): T {
  return fields;
}

export function readSlug(str: string) {
  return capitalize(str.replace(/-/g, " ").trim());
}

export function formatPrice(price: number) {
  return price.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function countDiscount(price: number, discount: number) {
  return price * (1 - Math.min(Math.abs(discount), 100) / 100);
}

export function cleanExtraSpaces(str: string) {
  return str.trim().replace(/\s+/g, " ");
}

export function removeUnwantedChars(str: string) {
  return str.replace(/[^a-zA-Z0-9\-\_\s]/g, "");
}

export function refineBlobStr(blobStr: "blob:" | (string & {})) {
  return blobStr.replace(/blob\:/, "blob\\:");
}

export const getImageSrc = ({ collection, product, name }: { collection: string; product: string; name: string }) => {
  return `${SERVER_ENDPOINT}/${collection}/${product}/${name}`;
};

export function getFileMimeTypes(str: string) {
  const lastDotIndex = str.lastIndexOf("/");

  if (lastDotIndex === -1) return { fileType: "", fileMime: "" };

  const fileType = str.substring(0, lastDotIndex);
  const fileMime = str.substring(lastDotIndex + 1);

  return { fileType, fileMime };
}

export function getFileDetails(str: string, mutable = false) {
  const title = mutable ? str : cleanExtraSpaces(str);
  const lastDotIndex = title.lastIndexOf(".");

  if (lastDotIndex === -1) return { fileName: title, fileExt: "" };

  const fileName = title.substring(0, lastDotIndex);
  const fileExt = title.substring(lastDotIndex + 1);

  return { fileName, fileExt };
}

export function initRawData(formData: FormData) {
  const rawData: { [key: string]: unknown } = {};
  const medias: Array<z.infer<typeof MediaFormSchema>> = [];

  const medias_title = formData.getAll("media.title");
  const medias_image = formData.getAll("media.image");

  for (const [key, value] of formData.entries()) {
    if (!key.includes("media")) {
      rawData[key] = value;
    }
  }

  Array.from({ length: Math.min(medias_title.length, medias_image.length) }).forEach((_, index) => {
    const title = medias_title[index];
    const image = medias_image[index];

    if (typeof title === "string" && image instanceof (File || Blob)) {
      medias.push({
        title,
        order: index,
        media: image,
      });
    }
  });

  rawData["medias"] = medias;

  return rawData;
}

export function handlingError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
}
