import { DashboardSonner } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DashboardSonner />
    </>
  );
}
