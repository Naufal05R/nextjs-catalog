"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjectsDeprecated, NavProjectsPromotions } from "@/components/nav-projects";
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
        <NavMain />
        <NavProjectsPromotions projects={navigations.projects.slice(0, 2)} />
        <NavProjectsDeprecated projects={navigations.projects.slice(2, 4)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigations.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
