import { DeprecatedProducts } from "@/components/page";
import DeprecatedNews from "@/components/page/DeprecatedNews";
import { notFound } from "next/navigation";

interface DeprecatedItemPageProps {
  params: {
    item: "products" | "news";
  };
}

export default function DeprecatedItemPage({ params }: DeprecatedItemPageProps) {
  switch (params.item) {
    case "products":
      return <DeprecatedProducts />;
    case "news":
      return <DeprecatedNews />;
    default:
      return notFound();
  }
}
