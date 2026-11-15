import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
    // ".dark" scopes the dark theme tokens to the dashboard subtree only —
    // page background, sidebar, cards and inputs all switch over.
    <div className="dark min-h-dvh bg-background text-foreground">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
};

export default DashboardLayout;
