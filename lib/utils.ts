import { Dataset } from "@/types/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function defineConst<T extends Dataset>(fields: T): T {
  return fields;
}

export function formatPrice(price: number) {
  const formatted = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatted;
}

export function capitalize(str: string, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}

export function slugify(str: string) {
  return str.toLowerCase().trim().replace(/\s+/g, "-");
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
