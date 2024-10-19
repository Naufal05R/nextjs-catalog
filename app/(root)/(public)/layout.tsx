import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { padding } from "@/lib/styles";
import { Toaster } from "@/components/ui/toaster";
import { Pathname } from "@/components/client/pathname";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={cn(padding.x, "")}>
        <Pathname />
        {children}
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
