import React from "react";

import { FrontEndNewsDisplay } from "@/components/server/News";

const NewsPage = () => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">News</h4>

      <FrontEndNewsDisplay />
    </section>
  );
};

export default NewsPage;
