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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
const Layout1 = () => {
  return (
    <div className="relative bg-accent">
      <div className="flex h-screen">
        <TooltipProvider delayDuration={100} disableHoverableContent={true}>
          <div className="relative lg:w-[232px]">
            <Link
              href="/"
              prefetch={false}
              className="flex justify-center items-center p-2"
            >
              <div className={cn("flex items-center size-10 lg:size-12")}>
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

            <ScrollArea className="h-[calc(100vh_-_120px)] text-popover-foreground p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      false
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/20 hover:text-primary mb-1 last:mb-0"
                    )}
                  >
                    <UserIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                    <span className="text-sm hidden lg:inline">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden z-50"
                >
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      true
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/20 hover:text-primary mb-1 last:mb-0"
                    )}
                  >
                    <UserIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                    <span className="text-sm hidden lg:inline">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden z-50"
                >
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </ScrollArea>

            {/* <div className="grid gap-2 overflow-y-scroll max-h-[calc(100vh_-_120px)] text-popover-foreground p-2">
            <div className="flex items-center p-2 rounded-lg bg-red-500">
              <UserIcon className="block flex-shrink-0 size-6 sm:mr-2" />
              <span className="text-sm hidden sm:inline">Profile</span>
            </div>
            <div className="flex items-center p-2 rounded-lg bg-red-500">
              <UserIcon className="block flex-shrink-0 size-6 sm:mr-2" />
              <span className="text-sm hidden sm:inline">Profile</span>
            </div>
          </div> */}

            <div className="absolute bottom-0 left-0 right-0 p-2 border-t">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      false
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/20 hover:text-primary"
                    )}
                  >
                    <SettingsIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                    <span className="text-sm hidden lg:inline">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden z-50"
                >
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
              {/* <Link
                href="/"
                className={cn(
                  "flex items-center p-2 rounded-lg",
                  false
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-primary/20 hover:text-primary"
                )}
              >
                <SettingsIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                <span className="text-sm hidden lg:inline">Settings</span>
              </Link> */}
            </div>
          </div>
        </TooltipProvider>
        <div className="w-full overflow-scroll">
          <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur p-3">
            <div className="flex justify-end items-center">
              {/* <h3 className="font-bold text-2xl">Settings</h3> */}
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-background shadow ">
                  <BellIcon className="flex flex-shrink-0 size-4" />
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
          <div className="rounded-lg p-4 bg-white">
            <h4 className="text-xl font-medium mb-4">Account settings</h4>
            <div className="lg:flex lg:gap-4">
              <div className="flex gap-3 lg:border-r lg:pr-4">
                <div className="flex gap-3 bg-accent rounded-full p-1 lg:flex-col lg:gap-1 lg:bg-transparent lg:rounded-none">
                  <div className="rounded-full px-4 py-1 bg-primary/20 text-primary ">
                    <span className="text-sm">My Profile</span>
                  </div>
                  <div className="rounded-full bg-white px-4 py-1 lg:bg-transparent hover:bg-primary/20 hover:text-primary">
                    <span className="text-sm">Security</span>
                  </div>
                  <div className="rounded-full bg-white px-4 py-1 lg:bg-transparent hover:bg-primary/20 hover:text-primary">
                    <span className="text-sm">Notifications</span>
                  </div>
                  <div className="rounded-full bg-white px-4 py-1 lg:bg-transparent hover:bg-primary/20 hover:text-primary">
                    <span className="text-sm">Appearance</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 w-full">
                <h4>My profile</h4>
                <div className="grid gap-2 border p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-24">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={AvatarDefault.src}
                      />
                      <AvatarFallback className="bg-transparent">
                        <Skeleton className="size-24 rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div className=""></div>
                    <Button variant="default" className="rounded-2xl">
                      Change picture
                    </Button>
                    <Button variant="destructive" className="rounded-2xl">
                      Delete picture
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1;
