import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          { children }
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
