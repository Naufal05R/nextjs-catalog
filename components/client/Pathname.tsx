"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Mapper from "@/components/server/Mapper";

import { ChevronDown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getAllCollection } from "@/lib/actions/collection.action";
import { cn, generateRoute, readSlug } from "@/lib/utils";

const Route = ({ title, href, className }: { title: string; href: string; className?: string }) => {
  const [collections, setCollections] = useState<Array<string>>([]);

  // TODO: Should optizing the way of fetching data using useSWR
  useEffect(() => {
    (async () => {
      const allCollections = await getAllCollection();

      if (allCollections) {
        for (const { slug } of allCollections) {
          setCollections((prev) => [...prev, slug]);
        }
      }
    })();
  }, []);

  switch (title) {
    case "collections":
      return (
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className={cn("flex items-center gap-1 py-4", className)}>
              {title}
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <Mapper
                data={collections}
                render={(collection) => (
                  <Link href={`/${title}/${collection}`}>
                    <DropdownMenuItem>{readSlug(collection)}</DropdownMenuItem>
                  </Link>
                )}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      );
    default:
      return (
        <BreadcrumbItem>
          <BreadcrumbLink href={href} className={cn("py-4", className)}>
            {readSlug(title)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
  }
};

export const PublicPathname = () => {
  const pathname = usePathname();

  const breadcrumbs = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs text-rose-400">
        {!!breadcrumbs.length && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="py-4 hover:text-rose-600">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <Mapper
              data={breadcrumbs}
              render={(breadcrumb, index) => {
                return (
                  // TODO: Should replace code from (<React.Fragment key={index}></React.Fragment>) to regular (<></>) when bug fixed by react or nextjs
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <Route
                      title={breadcrumb}
                      href={generateRoute(breadcrumbs, index + 1)}
                      className="capitalize hover:text-rose-600"
                    />
                  </React.Fragment>
                );
              }}
            />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const PrivatePathname = () => {
  const pathname = usePathname();

  const breadcrumbs = pathname.split("/").filter((path) => path !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList className="h-[52px] shrink overflow-hidden">
        {!!breadcrumbs.length && (
          // TODO: Should replace code from (<React.Fragment key={index}></React.Fragment>) to regular (<></>) when bug fixed by react or nextjs
          <>
            {/* <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="py-4">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem> */}

            <Mapper
              data={breadcrumbs}
              render={(breadcrumb, index) => {
                return (
                  <div key={index} className="flex items-center gap-1.5 sm:gap-2.5">
                    <BreadcrumbSeparator hidden={!index}>/</BreadcrumbSeparator>
                    <Route title={breadcrumb} href={generateRoute(breadcrumbs, index + 1)} />
                  </div>
                );
              }}
            />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
