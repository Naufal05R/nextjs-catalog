import React from "react";

import { FrontEndNewsCard } from "@/components/server/News";

const NewsPage = () => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">News</h4>

      <FrontEndNewsCard />
    </section>
  );
};

export default NewsPage;
