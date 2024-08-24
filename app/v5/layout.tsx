import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { DarkMode } from "@/components/switch-theme";

const V2Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative sm:flex sm:overflow-hidden">
      <div className="sticky top-0 left-0 w-full z-50 flex sm:block justify-between items-center backdrop-blur bg-background/60 sm:w-[200px] sm:h-screen sm:flex-shrink-0 ">
        <Link href="/" prefetch={false} className="flex items-center p-2">
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
        <div className="flex items-center gap-2 px-2 sm:hidden">
          <div className="flex items-center p-2 rounded-full hover:bg-primary/20 hover:text-primary">
            <BellIcon className="block flex-shrink-0 size-6" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <div className="p-1 bg-accent rounded-full">
                <Avatar className="size-8">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={AvatarDefault.src}
                  />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-8 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[360px] sm:hidden block"
            >
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

          <div className="flex items-center p-2 rounded-full hover:bg-primary/20 hover:text-primary">
            <MenuIcon className="block flex-shrink-0 size-6" />
          </div>
        </div>
        <div className="relative hidden sm:block sm:mt-5 sm:px-2 sm:max-h-full sm:overflow-y-scroll">
          <Link
            href="/"
            className="flex items-center p-2 rounded-lg mb-1 last:mb-0 hover:bg-primary/20 hover:text-primary"
          >
            <UserIcon className="block flex-shrink-0 size-6 sm:mr-2" />
            <span className="text-sm hidden sm:inline">Users</span>
          </Link>
          <Link
            href="/"
            className="flex items-center p-2 rounded-lg mb-1 last:mb-0 bg-primary/20 text-primary"
          >
            <UserIcon className="block flex-shrink-0 size-6 sm:mr-2" />
            <span className="text-sm hidden sm:inline">Posts</span>
          </Link>
          <Link
            href="/"
            className="flex items-center p-2 rounded-lg mb-1 last:mb-0 hover:bg-primary/20 hover:text-primary"
          >
            <UserIcon className="block flex-shrink-0 size-6 sm:mr-2" />
            <span className="text-sm hidden sm:inline">Products</span>
          </Link>

          <Link
            href="/"
            className="flex items-center p-2 rounded-lg mb-1 last:mb-0 hover:bg-primary/20 hover:text-primary"
          >
            <SettingsIcon className="block flex-shrink-0 size-6 sm:mr-2" />
            <span className="text-sm hidden sm:inline">Settings</span>
          </Link>
        </div>
      </div>
      <div className="w-full sm:max-h-screen sm:overflow-x-hidden sm:overflow-y-scroll">
        <header className="hidden sm:p-2 sm:flex sm:justify-end sm:items-center sm:gap-2 sm:sticky sm:top-0 sm:right-0 sm:w-full sm:backdrop-blur sm:bg-background/60 sm:z-50">
          <div className="p-2 rounded-full hover:bg-primary/20 hover:text-primary">
            <BellIcon className=" flex-shrink-0 size-6" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
              <div className="p-1 bg-accent rounded-full">
                <Avatar className="size-8">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={AvatarDefault.src}
                  />
                  <AvatarFallback className="bg-transparent">
                    <Skeleton className="size-8 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[360px] hidden sm:block"
            >
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
        </header>
        {children}
      </div>
    </div>
  );
};

export default V2Layout;
