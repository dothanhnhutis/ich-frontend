import { getCurrentUser } from "@/service/api/user.service";
import React from "react";

import Link from "next/link";
import { DataTable } from "./table";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent showXBtn={false} className="p-0">
          <div className="flex flex-col flex-grow h-screen relative">
            <div className="sticky top-0 left-0 right-0 bg-background px-4 pt-4 z-50">
              header
            </div>
            <div className="p-4 w-full pb-[100px] overflow-y-auto">
              <p className="bg-blue-300 h-[2000px]">body</p>
              <p className="bg-blue-500">body</p>
            </div>
            <div className="absolute bottom-0 right-0 w-full bg-transparent z-50">
              asdasd
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default User1Page;
