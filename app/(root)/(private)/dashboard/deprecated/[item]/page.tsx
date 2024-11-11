import { notFound } from "next/navigation";

interface DeprecatedItemPageProps {
  params: {
    item: "products" | "news";
  };
}

export default function DeprecatedItemPage({ params }: DeprecatedItemPageProps) {
  switch (params.item) {
    case "products":
      return <>Deprecated {params.item}</>;
    case "news":
      return <>Deprecated {params.item}</>;
    default:
      return notFound();
  }
}
