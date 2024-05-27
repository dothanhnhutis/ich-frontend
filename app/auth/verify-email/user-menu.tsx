"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { CurrentUser } from "@/schemas/user";
import { signOut } from "@/service/api/auth.service";
import { useRouter } from "next/navigation";
import { diableAuthUser } from "@/service/api/user.service";

const UserMenu = ({ currentUser }: { currentUser: CurrentUser }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={currentUser.picture ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          avoidCollisions
          align="end"
          className="w-[245px] hidden sm:block"
        >
          <DropdownMenuLabel className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser.picture ?? AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <p className="font-medium text-lg">{currentUser.username}</p>
            <p className="text-muted-foreground font-sm">{currentUser.role}</p>
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <SettingsIcon className="mr-4 h-4 w-4" />
            <span>Close Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              signOut();
              router.refresh();
            }}
          >
            <LogOutIcon className="mr-4 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => await diableAuthUser()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserMenu;
