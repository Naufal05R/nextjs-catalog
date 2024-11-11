import { getAllProduct } from "@/lib/actions/product.action";
import React from "react";
import Mapper from "../server/Mapper";

const DeprecatedProducts = async () => {
  const deprecatedProducts = await getAllProduct("isReady", false);
  return (
    <div>
      {deprecatedProducts && !!deprecatedProducts.length ? (
        <ul>
          Deprecated Products
          <Mapper data={deprecatedProducts} render={({ title }) => <li>{title}</li>} />
        </ul>
      ) : (
        "No Products"
      )}
    </div>
  );
};

export default DeprecatedProducts;
