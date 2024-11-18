import React from "react";
import Footer from "@/components//server/Footer";

import { PublicPathname } from "@/components/client/Pathname";
import { PublicHeader } from "@/components/server/Header";
import { padding } from "@/lib/styles";
import { cn } from "@/lib/utils";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main className={cn(padding.x, "")}>
        <PublicPathname />
        {children}
      </main>
      <Footer />
    </>
  );
}
