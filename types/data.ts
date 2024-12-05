export type Data = {
  [key in "title" | "slug" | (string & {})]: unknown;
};
export type Dataset<T extends Data | unknown = unknown> = Array<T>;
export type DataKeys<T extends Data> = {
  [K in keyof T]: K;
}[keyof T];
