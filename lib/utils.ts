import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function defineConst<T extends Array<{ [key: string]: unknown } | unknown>>(fields: T): T {
  return fields;
}

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
