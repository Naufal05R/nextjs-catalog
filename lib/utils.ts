import { Dataset } from "@/types/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function defineConst<T extends Dataset>(fields: T): T {
  return fields;
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function capitalize<T extends string>(str: string, lower = false): `${Capitalize<T>}` {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase()) as `${Capitalize<T>}`;
}

export function slugify<T extends string>(str: T): `${Lowercase<T>}` {
  return str.toLowerCase().trim().replace(/\s+/g, "-") as `${Lowercase<T>}`;
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
