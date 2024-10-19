import React from "react";

const page = ({ params }: { params: { collection: string; product: string } }) => {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl capitalize">{params.collection}</h4>
      <h4 className="mb-4 text-3xl capitalize">{params.product}</h4>
    </section>
  );
};

export default page;
