import { AppSidebar } from "@/components/app-sidebar";
import { PrivateHeader } from "@/components/server/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SignedIn>
        <AppSidebar />
        <SidebarInset>
          <PrivateHeader />
          {children}
        </SidebarInset>
      </SignedIn>
      <SignedOut>
        Not Authorized!
      </SignedOut>
    </SidebarProvider>
  );
}
