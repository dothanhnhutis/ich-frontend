import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import UserData from "./user-data";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const UserManagerPage = async ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  if (Object.entries(searchParams || {}).length == 0) {
    redirect("/manager/users?tab=active");
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-3xl font-bold text-2xl">User Manage</h2>
        <Button asChild size="sm">
          <Link href="/manager/users/create">
            <PlusIcon className="w-4 h-4 sm:hidden" />
            <p className="hidden sm:inline">Create new user</p>
          </Link>
        </Button>
      </div>

      <UserData searchParams={searchParams} />
    </>
  );
};

export default UserManagerPage;
