import { AppSidebar } from "@/components/app-sidebar";
import { PrivateHeader } from "@/components/server/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) redirect("/dashboard/sign-in");

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
        <section className="grid h-screen w-screen place-items-center">
          <h4 className="text-4xl font-bold uppercase">Not Authorized!</h4>
        </section>
      </SignedOut>
    </SidebarProvider>
  );
}
