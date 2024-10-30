import React from "react";
import Footer from "@/components/Footer";

import { Pathname } from "@/components/client/Pathname";
import { PublicHeader } from "@/components/Header";
import { padding } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main className={cn(padding.x, "")}>
        <Pathname />
        {children}
      </main>
      <Footer />
    </>
  );
}
