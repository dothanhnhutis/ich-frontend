import React from "react";
import { getAllUser, getCurrentUser } from "@/service/api/user.service";
import { DataTable } from "./data-table";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FilterUser } from "./filter";

const UserManagerPage = async ({
  searchParams,
}: {
  searchParams: { [index: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
  console.log(searchParams);
  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/manager">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Users</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-3xl font-bold text-2xl">Manager User</h2>
        <Button asChild size="sm">
          <Link href="/manager/users/create">
            <PlusIcon className="w-4 h-4 sm:hidden" />
            <p className="hidden sm:inline">Create new User</p>
          </Link>
        </Button>
      </div>
      <FilterUser />
      <DataTable currentUser={currentUser} />
    </div>
  );
};

export default UserManagerPage;
