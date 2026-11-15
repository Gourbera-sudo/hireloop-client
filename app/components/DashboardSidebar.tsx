"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

export type DashboardRole = "seeker" | "recruiter" | "admin";

type DashboardMenuItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

/**
 * Figma "HL 2.0/Sidebar" component — one variant per role:
 * Seeker: Dashboard, Jobs, Saved Jobs, Applications, Billing, Settings
 * Recruiter: Dashboard, My Company, Manage Jobs, Applications, Settings
 * Admin: Dashboard, Users, Companies, Jobs, Payments, Settings
 */
const menuItemsByRole: Record<DashboardRole, DashboardMenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    {
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    {
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
        name: "Add Job",
        url: "/dashboard/recruiter/jobs/new",
        icon: PlusCircle,
    },
    {
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: Users,
    },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    {
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

export function DashboardSidebar() {
  // isPending is true until the session request resolves — without gating on
  // it, recruiters/admins would see the seeker menu (the default) flash first.
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const role: DashboardRole =
    (session?.user?.role as DashboardRole | undefined) ?? "seeker"; // default to seeker if role is undefined
  const items = menuItemsByRole[role];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {isPending
              ? // Session is loading — render skeletons instead of the wrong role's menu.
                // (Fixed widths, not SidebarMenuSkeleton, so SSR and client HTML match.)
                Array.from({ length: 6 }, (_, i) => (
                  <li key={`skeleton-${i}`} className="flex h-8 items-center gap-2 px-2">
                    <div className="size-4 rounded-md bg-muted" />
                    <div className="h-4 w-24 rounded-md bg-muted" />
                  </li>
                ))
              : items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      render={<Link href={item.url} />}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
