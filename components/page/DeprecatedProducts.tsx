import React from "react";
import { DashboardProductDisplay } from "@/components/server/Product";

const DeprecatedProducts = () => {
  return (
    <section className="grid size-full place-items-start">
      <DashboardProductDisplay isReady={false} />
    </section>
  );
};

export default DeprecatedProducts;
