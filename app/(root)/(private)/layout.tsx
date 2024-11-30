import { DashboardSonner } from "@/components/ui/sonner";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <DashboardSonner />
    </>
  );
}
