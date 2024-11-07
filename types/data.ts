export type Data = { [key: string]: unknown };
export type Dataset = Array<Data | unknown>;
export type DataKeys<T extends Data> = {
  [K in keyof T]: K // T[K] extends string ? K : never;
}[keyof T];
