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
import { cn, readSlug } from "@/lib/utils";

const Route = ({ title, href, className }: { title: string; href: string; className?: string }) => {
  const [collections, setCollections] = useState<Array<string>>([]);

  useEffect(() => {
    return () => {
      (async () => {
        const allCollections = await getAllCollection();

        if (allCollections) {
          for (const { slug } of allCollections) {
            setCollections((prev) => [...prev, slug]);
          }
        }
      })();
    };
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
                const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;

                return (
                  <>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <Route title={breadcrumb} href={href} className="capitalize hover:text-rose-600" />
                  </>
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
      <BreadcrumbList>
        {!!breadcrumbs.length && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="py-4">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <Mapper
              data={breadcrumbs}
              render={(breadcrumb, index) => {
                const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;

                return (
                  <>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <Route title={breadcrumb} href={href} />
                  </>
                );
              }}
            />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
