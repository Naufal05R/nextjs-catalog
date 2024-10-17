import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function defineConst<T extends Array<{ [key: string]: unknown }>>(fields: T): T {
  return fields;
}
