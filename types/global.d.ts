type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Replace<S extends string, T extends string, U extends string> = S extends `${infer Start}${T}${infer End}`
  ? `${Start}${U}${End}`
  : S;
