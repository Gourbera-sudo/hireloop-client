import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";
import { Toast } from "@base-ui/react";
import { Toaster } from "@/components/ui/toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
    // Dark tokens come from the root layout (`dark` on <html>); this wrapper
    // just fills the viewport below the fixed-height dashboard content.
    <div className="min-h-dvh bg-background text-foreground">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </div>
  )
};

export default DashboardLayout;
