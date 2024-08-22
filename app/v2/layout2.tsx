import { DarkMode } from "@/components/switch-theme";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";
import AvatarDefault from "@/images/avatars/user-1.jpg";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  LogOutIcon,
  MailIcon,
  ShieldPlusIcon,
  UserIcon,
} from "lucide-react";
const Layout2 = () => {
  return (
    <div className="relative">
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur bg-background/60">
        <div className="flex justify-between items-center px-3 py-2">
          <Link href="/" prefetch={false}>
            <div className={cn("flex items-center size-12")}>
              <AspectRatio
                ratio={1 / 1}
                className="flex items-center justify-center"
              >
                <Image
                  priority
                  src={LogoImg.src}
                  width={LogoImg.width}
                  height={LogoImg.height}
                  alt="logo"
                  title="logo-ich"
                />
              </AspectRatio>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-muted">
              <BellIcon className="flex flex-shrink-0 size-4" />
            </div>
            <DarkMode />
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={AvatarDefault.src}
                  />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-9 rounded-full" />
                  </AvatarFallback>
                </Avatar>
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
                  <Link href="/manager" className="cursor-pointer">
                    <span>Manager</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/account/profile" className="cursor-pointer">
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="cursor-pointer">
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex">
        <div className="sticky top-[64px] h-[calc(100vh-64px)] z-50 transition-all">
          <div className="w-[200px]">siderBar</div>
        </div>
        <div className=" bg-muted w-full rounded-2xl shadow m-4">
          <div className="sm:flex sm:h-full p-4">
            <div className="sm:border-r border-background">
              <h4 className="text-lg">Settings</h4>
              <div className="flex gap-4 sm:block pr-4 rounded-full bg-white">
                <div className="flex items-center gap-2 p-2 sm:w-[200px] rounded-full sm:rounded-lg">
                  <UserIcon className="block flex-shrink-0 size-5" />
                  <p className="text-sm">Profile</p>
                </div>
                <div className="flex items-center gap-2 p-2 sm:w-[200px] text-primary bg-primary/20 rounded-full sm:rounded-lg">
                  <ShieldPlusIcon className="block flex-shrink-0 size-5" />
                  <p className="text-sm">Security</p>
                </div>
              </div>
            </div>

            <div className="">
              <h4>My Profile</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout2;
