import { Toaster } from "@/components/ui/toaster";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
