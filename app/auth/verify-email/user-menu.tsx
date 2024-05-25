"use client";
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { CurrentUser } from "@/schemas/user";
import { signOut } from "@/service/api/auth.service";
import { useRouter } from "next/navigation";

const UserMenu = ({ currentUser }: { currentUser: CurrentUser }) => {
  const router = useRouter();
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
        <DropdownMenuContent avoidCollisions align="end" className="w-[245px]">
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

          <DropdownMenuItem asChild>
            <Link href="" className="cursor-pointer">
              <SettingsIcon className="mr-4 h-4 w-4" />
              <span>Close Account</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <button
              onClick={() => {
                signOut();
                router.refresh();
              }}
              className="cursor-pointer w-full"
            >
              <LogOutIcon className="mr-4 h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
