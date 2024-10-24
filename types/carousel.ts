type AvailableScreensSizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvailableFlexBasis =
  | "basis-full"
  | "basis-1/2"
  | "basis-1/3"
  | "basis-1/4"
  | "basis-1/5"
  | "basis-1/6"
  | "basis-1/12";

type ResponsivePair = `${AvailableScreensSizes}:${AvailableFlexBasis}`;

export type ResponsiveArgs = Array<ResponsivePair>;
