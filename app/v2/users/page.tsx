import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { ChevronDownIcon, LogOutIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { DarkMode } from "@/components/switch-theme";

const UserManagementPage = () => {
  return (
    <div className="bg-background h-full border rounded-xl p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-2xl">User management</h3>
          <p className="text-sm font-normal leading-snug text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none" asChild>
            <div className="flex items-center gap-2 bg-background p-2 cursor-pointer shadow rounded-full">
              <Avatar className="size-8">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={AvatarDefault.src}
                />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="size-8 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block max-w-[120px]">
                <p className="font-bold truncate text-sm ">Thành Nhựt</p>
                <p className="text-muted-foreground text-xs">Admin</p>
              </div>
              <div className="hidden sm:block p-1 rounded-full bg-muted">
                <ChevronDownIcon className="flex flex-shrink-0 size-2" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[360px]">
            <DropdownMenuLabel className="flex items-center gap-3">
              <Avatar className="size-24">
                <AvatarImage
                  referrerPolicy="no-referrer"
                  src={AvatarDefault.src}
                />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="size-24 rounded-full" />
                </AvatarFallback>
              </Avatar>

              <div className="w-full overflow-hidden">
                <p className="font-medium text-lg">Thành Nhựt</p>
                <p className="text-muted-foreground font-normal">Admin</p>
                <div className="flex items-center space-x-2 text-muted-foreground w-full">
                  <MailIcon className="flex flex-shrink-0 size-4" />
                  <p className="text-sm truncate">gaconght@gmail.com</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href="/account/settings"
                className="cursor-pointer h-[34px]"
              >
                <span className="font-medium">Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Label htmlFor="dark-mode" className="flex justify-between">
                <span>Dark mode</span>
                <DarkMode id="dark-mode" />
              </Label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span className="font-medium">Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col mt-4 gap-4"></div>
    </div>
  );
};

export default UserManagementPage;
