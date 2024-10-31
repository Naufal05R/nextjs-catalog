import { AppSidebar } from "@/components/app-sidebar";
import { PrivateHeader } from "@/components/server/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PrivateHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
