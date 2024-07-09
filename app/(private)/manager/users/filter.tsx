"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpDownIcon,
  FilterIcon,
  Grid3X3Icon,
  LayoutPanelTopIcon,
  ListIcon,
  SearchIcon,
  TableIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ListView from "./list";
import { cn } from "@/lib/utils";
import { CardView } from "./card";
import { useQuery } from "@tanstack/react-query";
import { searchUser, SearchUserInput } from "@/service/api/user.service";

export const FilterUser = ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const [filter, setFilter] = useState<SearchUserInput>(() => {
    const result: SearchUserInput = {
      page: 1,
      take: 100,
    };
    if (searchParams?.tab == "inActive") {
      result.inActive = true;
    }
    if (searchParams?.tab == "suspended") {
      result.suspended = true;
    }
  });

  const { data, isPending } = useQuery({
    queryKey: ["users", searchParams?.tab],
    queryFn: async () => {
      return await searchUser(filter);
    },
  });

  return (
    <>
      <div
        className={cn(
          "bg-card text-card-foreground border p-2 space-y-2",
          viewMode == "list" ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"
        )}
      >
        <div className="flex items-center flex-grow border-b">
          <Link
            href="/manager/users?tab=active"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "active" ? "border-b-2 border-primary" : ""
            )}
          >
            Active
          </Link>
          <Link
            href="/manager/users?tab=inactive"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "inactive" ? "border-b-2 border-primary" : ""
            )}
          >
            InActive
          </Link>
          <Link
            href="/manager/users?tab=suspended"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "suspended"
                ? "border-b-2 border-primary"
                : ""
            )}
          >
            Suspended
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="inline-flex items-center flex-wrap gap-2 w-full">
            <Button variant="outline">
              <span className="hidden sm:inline">Filter</span>
              <FilterIcon className="size-4 sm:ml-2" />
            </Button>
            <div className="flex items-center gap-2 border rounded-lg p-2 h-10 text-sm">
              <input
                type="text"
                placeholder="Email..."
                className="outline-none bg-transparent"
              />
              <Separator orientation="vertical" />
              <SearchIcon className="size-5 cursor-pointer" />
            </div>
            <Button variant="ghost">
              Reset
              <XIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <span className="hidden sm:inline">Sort by</span>
              <ArrowUpDownIcon className="size-4 sm:ml-2" />
            </Button>
            <Button
              onClick={() =>
                setViewMode((prev) => (prev == "card" ? "list" : "card"))
              }
              size="icon"
              variant="outline"
            >
              {viewMode == "list" ? (
                <TableIcon className="size-4" />
              ) : (
                <LayoutPanelTopIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {viewMode == "list" ? (
        <ListView data={data?.users} />
      ) : (
        <CardView data={data?.users} />
      )}
    </>
  );
};
