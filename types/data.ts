export type Data = {
  [key in "title" | "slug" | (string & {})]: unknown;
};
export type Dataset<T extends Data = Data> = Array<T extends infer Data ? Data : never | unknown>;
export type DataKeys<T extends Data> = {
  [K in keyof T]: K; // T[K] extends string ? K : never;
}[keyof T];
