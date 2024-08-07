import React from "react";
import { getCurrentUser } from "@/service/api/user.service";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import UserProvider from "@/components/providers/user-provider";
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
    <UserProvider>
      <div className="w-full mx-auto xl:max-w-screen-xl xl:mx-auto p-4">
        <div className="flex items-center justify-between gap-2 my-2">
          <h2 className="lg:text-3xl font-bold text-2xl">Manager User</h2>
          <Button asChild size="sm">
            <Link href="/manager/users/create">
              <PlusIcon className="w-4 h-4 sm:hidden" />
              <p className="hidden sm:inline">Create new user</p>
            </Link>
          </Button>
        </div>

        <UserData searchParams={searchParams} />
      </div>
    </UserProvider>
  );
};

export default UserManagerPage;
