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
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { User } from "@/schemas/user";
import { signOut } from "@/service/api/auth.service";
import { useRouter } from "next/navigation";
import { disactivateAccount } from "@/service/api/user.service";
import { useQueryClient } from "@tanstack/react-query";

const UserMenu = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
              queryClient.removeQueries();
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
              This action cannot be undone. This will deactivate your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (await disactivateAccount()) {
                  router.push("/auth/signin");
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserMenu;
