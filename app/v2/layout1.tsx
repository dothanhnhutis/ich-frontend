import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LogoImg from "@/images/logos/logo.png";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  ChevronDownIcon,
  LogOutIcon,
  MailIcon,
  SettingsIcon,
  ShieldPlusIcon,
  UserIcon,
} from "lucide-react";
import { DarkMode } from "@/components/switch-theme";
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
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const Layout1 = () => {
  return (
    <div className="relative bg-muted dark:bg-background">
      <div className="flex h-screen">
        <div className="relative bg-background">
          <Link
            href="/"
            prefetch={false}
            className="flex justify-center items-center p-4"
          >
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
          <div className="grid px-4 py-2 sm:w-[236px] overflow-y-scroll max-h-[calc(100vh_-_132px)]">
            <div className="flex items-center gap-2 p-2  rounded-lg">
              <UserIcon className="block flex-shrink-0 size-5" />
              <p className="text-sm hidden">Profile</p>
            </div>
            <div className="flex items-center gap-2 p-2 text-primary bg-primary/20 rounded-lg">
              <ShieldPlusIcon className="block flex-shrink-0 size-5" />
              <p className="text-sm hidden">Security</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-background px-4 py-2">
            <div className="flex items-center gap-2 p-2 rounded-lg">
              <SettingsIcon className="block flex-shrink-0 size-5" />
              <p className="text-sm">Settings</p>
            </div>
          </div>
        </div>
        <div className="w-full overflow-scroll p-3">
          <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur">
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-2xl">Settings</h3>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-background shadow">
                  <BellIcon className="flex flex-shrink-0 size-4" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none" asChild>
                    <div className="flex items-center gap-2 bg-background p-2 rounded-full shadow sm:rounded-md">
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
                        <p className="font-bold truncate text-sm ">
                          Thành Nhựt
                        </p>
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
                        <p className="text-muted-foreground font-normal">
                          Admin
                        </p>
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
                      <Label
                        htmlFor="dark-mode"
                        className="flex justify-between"
                      >
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
            </div>
          </header>
          <div className="rounded-lg bg-background p-4">
            <div className="sm:flex sm:h-full p-4">
              <div className="sm:border-r border-background">
                <div className="flex gap-4 sm:block pr-4 rounded-full ">
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
    </div>
  );
};

export default Layout1;
