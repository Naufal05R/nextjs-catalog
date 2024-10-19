import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import { Toaster } from "@/components/ui/toaster";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={cn(padding.x, "")}>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
