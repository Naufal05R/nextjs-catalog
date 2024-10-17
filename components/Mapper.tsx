import React, { Children } from "react";

interface MapperProps<T extends Array<{ [key: string]: unknown }>> {
  data: T;
  render: (item: T[number], index: number) => React.ReactNode;
}

const Mapper = <T extends Array<{ [key: string]: unknown }>>({ data, render }: MapperProps<T>) => {
  return Children.toArray(data.map((item: T[number], index) => render(item, index)));
};

export default Mapper;
