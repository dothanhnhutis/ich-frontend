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
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";

const V2Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative sm:bg-accent">
      <div className="sm:flex sm:h-screen">
        <TooltipProvider delayDuration={100} disableHoverableContent={true}>
          <div className="flex sm:block sm:relative lg:w-[200px] sticky top-0 left-0 right-0 z-50 sm:z-auto sm:top-auto sm:left-auto sm:right-auto flex-shrink-0 backdrop-blur bg-background/60 sm:backdrop-blur-none sm:bg-transparent">
            <Link href="/" prefetch={false} className="flex items-center p-2">
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

            <ScrollArea className="h-[calc(100vh_-_160px)] text-popover-foreground p-2 hidden sm:block">
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
                  <p>Profile1</p>
                </TooltipContent>
              </Tooltip>
            </ScrollArea>

            <div className="absolute bottom-0 sm:left-0 right-0 ">
              <div className="flex sm:flex-col gap-2 p-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/"
                      className={cn(
                        "sm:flex items-center p-2 rounded-lg hidden",
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
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
                <div
                  className={cn(
                    "flex items-center p-2 rounded-lg sm:hidden",
                    false
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/20 hover:text-primary"
                  )}
                >
                  <BellIcon className="block flex-shrink-0 size-6 sm:mr-2" />
                  {/* <span className="text-sm hidden sm:inline">Settings</span> */}
                </div>

                <div className="lg:flex items-center justify-between w-full gap-2 bg-accent sm:bg-background p-1 lg:p-2 rounded-full lg:rounded-lg sm:border cursor-pointer">
                  <Avatar className="size-8">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block w-full max-w-[102px]">
                    <p className="font-medium truncate text-sm ">Thành Nhựt</p>
                    <p className="text-muted-foreground text-xs">Admin</p>
                  </div>
                  <div className="hidden lg:block rounded-full">
                    <ChevronsUpDownIcon className="flex flex-shrink-0 size-4" />
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center p-2 rounded-lg sm:hidden",
                    false
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/20 hover:text-primary"
                  )}
                >
                  <MenuIcon className="block flex-shrink-0 size-6 sm:mr-2" />
                  <span className="text-sm hidden sm:inline">Settings</span>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>

        <div className="py-2 pr-2 sm:min-h-screen sm:w-full sm:overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default V2Layout;
