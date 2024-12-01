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
import { toggleFavoriteCollection } from "@/lib/actions/collection.action";
import { useActionState, useEffect, useState } from "react";
import Mapper from "./server/Mapper";
import { Button } from "./ui/button";
import { useCollection } from "@/hooks/use-collection";
import { Collection } from "@prisma/client";

export function NavMain() {
  const [state, formAction, isPending] = useActionState(toggleFavoriteCollection, undefined);
  const [collections, setCollections] = useState<Array<Collection>>([]);
  const { collections: data, error, isLoading } = useCollection();

  useEffect(() => {
    if (data) setCollections(data);
    if (error) console.log(error);
  }, [data, error, state]);

  if (isLoading || !collections) return;

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
                {!!collections.length && (
                  <Mapper
                    data={collections}
                    render={({ id, title, slug, isFavorite }) => (
                      <SidebarMenuSubItem key={title} className="relative flex items-center justify-between">
                        <SidebarMenuSubButton asChild className="flex-1">
                          <Link href={`/dashboard/products/${slug}`}>
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuSubButton>

                        <Button
                          variant={null}
                          size="icon"
                          className="ml-2 mr-[-0.5px] grid size-4 place-items-center rounded-full shadow-none hover:bg-transparent disabled:opacity-100"
                          form={`toggle-favorite-collection-${id}`}
                          disabled={isPending || isFavorite}
                        >
                          <form id={`toggle-favorite-collection-${id}`} action={formAction} className="hidden" />
                          <input
                            name="id"
                            type="hidden"
                            className="hidden"
                            defaultValue={id}
                            form={`toggle-favorite-collection-${id}`}
                            readOnly
                          />
                          <Star fill={isFavorite ? "#f59e0b" : "transparent"} className="text-amber-500" />
                        </Button>
                      </SidebarMenuSubItem>
                    )}
                  />
                )}
                <SidebarMenuSubItem>
                  <CreateCollectionDialog list={collections} setList={setCollections} />
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
