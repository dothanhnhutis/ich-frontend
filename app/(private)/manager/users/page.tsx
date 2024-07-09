import React from "react";
import { getCurrentUser } from "@/service/api/user.service";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FilterUser } from "./filter";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const UserManagerPage = async ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
  if (Object.entries(searchParams || {}).length == 0) {
    redirect("/manager/users?tab=active");
  }
  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-3xl font-bold text-2xl">Manager User</h2>
        <Button asChild size="sm">
          <Link href="/manager/users/create">
            <PlusIcon className="w-4 h-4 sm:hidden" />
            <p className="hidden sm:inline">Create new User</p>
          </Link>
        </Button>
      </div>
      <FilterUser searchParams={searchParams} />

      <DataTable currentUser={currentUser} />
    </div>
  );
};

export default UserManagerPage;
