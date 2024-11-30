import { DeprecatedProducts } from "@/components/page";
import DeprecatedNews from "@/components/page/DeprecatedNews";
import { notFound } from "next/navigation";

interface DeprecatedItemPageProps {
  params: Promise<{
    item: "products" | "news";
  }>;
}

export default async function DeprecatedItemPage({ params }: DeprecatedItemPageProps) {
  const { item } = await params;

  switch (item) {
    case "products":
      return <DeprecatedProducts />;
    case "news":
      return <DeprecatedNews />;
    default:
      return notFound();
  }
}
