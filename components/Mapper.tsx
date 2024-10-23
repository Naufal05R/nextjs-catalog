import React, { Children } from "react";

type Dataset = Array<{ [key: string]: unknown } | unknown>;

interface MapperProps<T extends Dataset> {
  data: T;
  render: (item: T[number], index: number) => React.ReactNode;
}

const Mapper = <T extends Dataset>({ data, render }: MapperProps<T>) => {
  return Children.toArray(data.map((item: T[number], index) => render(item, index)));
};

export default Mapper;
