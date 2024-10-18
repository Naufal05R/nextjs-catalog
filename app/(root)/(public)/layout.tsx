import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={cn(padding.x, "")}>{children}</main>
      <Footer />
    </>
  );
}
