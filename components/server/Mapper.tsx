import { Dataset } from "@/types/data";
import React, { Children } from "react";

interface MapperProps<T extends Dataset> {
  data: T;
  getKey?: (item: T[number], index: number) => React.Key;
  render: (item: T[number], index: number) => React.ReactNode;
}

const Mapper = <T extends Dataset>({ data, getKey = (_, index) => index, render }: MapperProps<T>) => {
  return Children.toArray(
    data.map((item, index) => {
      const element = render(item, index);
      return React.isValidElement(element) && React.cloneElement(element, { key: getKey(item, index) });
    }),
  );
};

export default Mapper;
