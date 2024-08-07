"use client";
import { useUserData } from "@/components/providers/user-provider";
import { cn } from "@/lib/utils";
import { pick } from "lodash";
import Link from "next/link";
import React from "react";
import { UserFilterSheet } from "./user-filter-sheet";
import { ViewModeBtn } from "./view-mode-btn";
import { UserSortBy } from "./user-sort-by";

export const UserToolBar = ({
  tab = "active",
}: {
  tab?: "active" | "disabled" | "suspended";
}) => {
  const { viewMode, filter } = useUserData();

  return (
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
            tab == "active" ? "border-b-2 border-primary" : ""
          )}
        >
          Active
        </Link>
        <Link
          href="/manager/users?tab=suspended"
          className={cn(
            "font-semibold p-2",
            tab == "suspended" ? "border-b-2 border-primary" : ""
          )}
        >
          Suspended
        </Link>
        <Link
          href="/manager/users?tab=disabled"
          className={cn(
            "font-semibold p-2",
            tab == "disabled" ? "border-b-2 border-primary" : ""
          )}
        >
          Disabled
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="inline-flex items-center flex-wrap gap-2 w-full">
          <UserFilterSheet
            {...pick(filter, ["emails", "roles", "emailVerified"])}
          />
        </div>
        <div className="flex gap-2">
          <UserSortBy init={filter?.orderBy} />
          <ViewModeBtn />
        </div>
      </div>
    </div>
  );
};
