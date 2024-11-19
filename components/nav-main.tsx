"use client";

import Link from "next/link";
import { Boxes, ChevronRight, Star } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CreateCollectionDialog } from "./client/Dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ToggleButton } from "./client/Button";
import { handlingError, slugify } from "@/lib/utils";
import { toggleFavoriteCollection } from "@/lib/actions/collection.action";
import { useEffect, useState } from "react";
import { CollectionsSchema } from "@/schema/collection";
import { Collection } from "@prisma/client";
import Mapper from "./server/Mapper";

export function NavMain() {
  const [collections, setCollections] = useState<Array<Collection>>([]);

  useEffect(() => {
    return () => {
      (async () => {
        const response = await fetch("/api/list/collection");
        const { data: rawApiData } = await response.json();
        const { success, error, data } = CollectionsSchema.safeParse(rawApiData);

        if (success) {
          setCollections(data);
        } else {
          handlingError(error);
        }
      })();
    };
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>All Products</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Collections">
                <Boxes />
                <span>Collections</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <Mapper
                  data={collections}
                  render={({ title, slug }) => (
                    <SidebarMenuSubItem key={title} className="relative flex items-center justify-between">
                      <SidebarMenuSubButton asChild className="flex-1">
                        <Link href={`/dashboard/products/${slug}`}>
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuSubButton>

                      <ToggleButton
                        icon={<Star size={16} className="size-4 opacity-50" />}
                        identifier={slugify(title)}
                        toggleAction={toggleFavoriteCollection}
                        className="ml-2 mr-[-0.5px] size-fit"
                      />
                    </SidebarMenuSubItem>
                  )}
                />
                <SidebarMenuSubItem>
                  <CreateCollectionDialog
                    list={collections}
                    setList={setCollections}
                    trigger={{ title: "New Collections", element: SidebarMenuSubButton }}
                    content={{
                      title: "Create New Collections",
                      element: (
                        <>
                          <fieldset className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Collections" className="text-left">
                              Title
                            </Label>
                            <Input id="Collections" name="title" className="col-span-3" form="create-collection-form" />
                          </fieldset>
                          <fieldset className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="description" className="py-[11px] text-left">
                              Description
                            </Label>
                            <Textarea
                              rows={3}
                              id="description"
                              name="description"
                              className="col-span-3"
                              form="create-collection-form"
                            />
                          </fieldset>
                        </>
                      ),
                    }}
                  />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
