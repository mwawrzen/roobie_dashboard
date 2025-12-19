import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authService } from "@/services/auth.service";
import { User } from "@/services/user.service";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const user: User= await authService.getMe();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc( var( --spacing )* 72 )",
            "--sidebar-height": "calc( var( --spacing )* 12 )",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" user={ user } />
        <SidebarInset>
          <SiteHeader />
          <main className="h-full p-4">
            { children }
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
