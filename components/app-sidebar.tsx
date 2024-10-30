"use client";

import * as React from "react";
import { ArchiveX, AudioWaveform, Boxes, Command, GalleryVerticalEnd, Newspaper } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "#",
      icon: Boxes,
      isActive: true,
      items: [],
    },
    {
      title: "Blogs",
      url: "#",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "Permata Indah",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Products",
      url: "#",
      icon: ArchiveX,
    },
    {
      name: "Blogs",
      url: "#",
      icon: ArchiveX,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navigations, setNavigations] = React.useState(data);

  React.useEffect(() => {
    (async function () {
      const response = await fetch("/api/list/collection");
      const { data } = await response.json();

      setNavigations({
        ...navigations,
        navMain: [
          {
            title: "Products",
            url: "/dashboard/products",
            icon: Boxes,
            isActive: true,
            items: data.map((category) => ({
              title: category.title,
              url: `dashboard/collections/${category.url}`,
            })),
          },
          ...navigations.navMain.filter((item) => item.title !== "Products"),
        ],
      });
    })();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navigations.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigations.navMain} />
        <NavProjects projects={navigations.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navigations.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
