"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjectsPromotions } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { navigations } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigations.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigations.navMain} />
        <NavProjectsPromotions projects={navigations.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigations.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
