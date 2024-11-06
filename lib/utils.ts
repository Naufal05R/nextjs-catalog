import { Dataset } from "@/types/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function padValue(value: number) {
  return String(value).padStart(3, "0");
}

export function defineConst<T extends Dataset>(fields: T): T {
  return fields;
}

export function formatPrice(price: number) {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize(str: string, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

export function readSlug(str: string) {
  return capitalize(str.replace(/-/g, " ").trim());
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
}

export function getFileMimeTypes(str: string) {
  const lastDotIndex = str.lastIndexOf("/");

  if (lastDotIndex === -1) return { fileType: "", fileMime: "" };

  const fileType = str.substring(0, lastDotIndex);
  const fileMime = str.substring(lastDotIndex);

  return { fileType, fileMime };
}

export function getFileDetails(str: string) {
  const lastDotIndex = str.lastIndexOf(".");

  if (lastDotIndex === -1) return { fileName: str, fileExt: "" };

  const fileName = str.substring(0, lastDotIndex);
  const fileExt = str.substring(lastDotIndex);

  return { fileName, fileExt };
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
