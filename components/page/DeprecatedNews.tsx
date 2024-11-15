import React from "react";
import { BackEndNewsDisplay } from "../server/News";

const DeprecatedNews = () => {
  return (
    <section className="grid size-full place-items-start">
      <BackEndNewsDisplay isRelevant={false} />
    </section>
  );
};

export default DeprecatedNews;
