import { getCurrentUser } from "@/service/api/user.service";
import React from "react";

import Link from "next/link";
import { DataTable } from "./table";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const User1Page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
      <div className="flex items-center justify-between gap-2 my-2">
        <h2 className="lg:text-2xl font-bold text-lg">Manager User</h2>
        <Button asChild size={"sm"}>
          <Link href="/manager/users/create">
            <PlusIcon className="w-4 h-4 sm:hidden" />
            <p className="hidden sm:inline">Create new User</p>
          </Link>
        </Button>
      </div>
      <DataTable currentUser={currentUser} />
    </div>
  );
};

export default User1Page;
