type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type Replace<S extends string, T extends string, U extends string> = S extends `${infer Start}${T}${infer Rest}`
  ? `${Start}${U}${Replace<Rest, T, U>}`
  : S;

type Trim<S extends string> = S extends ` ${infer Rest}`
  ? Trim<Rest>
  : S extends `${infer Rest} `
    ? Trim<Rest>
    : S extends `${infer Start} ${infer End}`
      ? `${Trim<Start>} ${Trim<End>}`
      : S;
