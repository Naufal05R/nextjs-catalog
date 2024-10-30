import { AppSidebar } from "@/components/app-sidebar";
import { PrivateHeader } from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PrivateHeader />
        {children}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
