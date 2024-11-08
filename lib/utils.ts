import { z } from "zod";
import { Dataset } from "@/types/data";
import { MediaFormSchema } from "@/schema/media";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
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

export function getFileMimeTypes(str: string) {
  const lastDotIndex = str.lastIndexOf("/");

  if (lastDotIndex === -1) return { fileType: "", fileMime: "" };

  const fileType = str.substring(0, lastDotIndex);
  const fileMime = str.substring(lastDotIndex + 1);

  return { fileType, fileMime };
}

export function getFileDetails(str: string) {
  const lastDotIndex = str.lastIndexOf(".");

  if (lastDotIndex === -1) return { fileName: str, fileExt: "" };

  const fileName = str.substring(0, lastDotIndex);
  const fileExt = str.substring(lastDotIndex + 1);

  return { fileName, fileExt };
}

export function initRawData(formData: FormData) {
  const rawData: { [key: string]: unknown } = {};
  const medias: Array<z.infer<typeof MediaFormSchema>> = [];

  for (const [key, value] of formData.entries()) {
    if (key === "media.image" && value instanceof (File || Blob)) {
      const { name, type } = value;
      const underscoreIndex = value.name.indexOf("_");

      medias.push({
        title: readSlug(name.substring(underscoreIndex + 1)),
        order: Number(name.substring(0, underscoreIndex)),
        media: new File([value], name, { type }),
      });
    } else {
      rawData[key] = value;
    }
  }

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
