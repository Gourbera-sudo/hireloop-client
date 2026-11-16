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
 * Recruiter: Dashboard, Add Job, Manage Jobs, Applications, Settings
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
        name: "Add Job",
        url: "/dashboard/recruiter/jobs/new",
        icon: PlusCircle,
    },
    {
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
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

  const name = session?.user?.name ?? "";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]!.toUpperCase())
      .join("") || "U";

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col gap-3 p-2">
          <div className="flex items-center gap-2 px-1">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-orange-500 text-xs font-bold text-white">
              H
            </span>
            <span className="text-sm font-semibold text-white">hireloop</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-500/20 text-xs font-semibold text-indigo-300">
              {isPending ? "…" : initials}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">
                {isPending ? "Loading…" : name || "Guest"}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs text-zinc-500">
                  {isPending ? "" : role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
                <span className="rounded-full bg-indigo-500/15 px-1.5 py-px text-[10px] font-medium text-indigo-300">
                  Premium account
                </span>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>
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
                      className="relative data-active:before:absolute data-active:before:left-0 data-active:before:top-1/2 data-active:before:-translate-y-1/2 data-active:before:h-5 data-active:before:w-0.5 data-active:before:rounded-full data-active:before:bg-indigo-400 data-active:before:content-['']"
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
