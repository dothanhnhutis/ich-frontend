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
import { ChevronsUpDownIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-accent">
      <div className="flex h-screen ">
        <TooltipProvider delayDuration={100} disableHoverableContent={true}>
          <div className="relative lg:w-[200px] flex-shrink-0 ">
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

            <ScrollArea className="h-[calc(100vh_-_160px)] text-popover-foreground p-2">
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

            <div className="absolute bottom-0 left-0 right-0 ">
              <div className="flex flex-col gap-2 p-2">
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
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <div className="flex items-center justify-between w-full gap-2 bg-background p-1 lg:p-2 rounded-full lg:rounded-lg lg:border cursor-pointer">
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
                    <p className="font-medium truncate text-sm ">
                      Thành Nhựt as da sd
                    </p>
                    <p className="text-muted-foreground text-xs">Admin</p>
                  </div>
                  <div className="hidden lg:block rounded-full">
                    <ChevronsUpDownIcon className="flex flex-shrink-0 size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>

        <div className="py-2 pr-2 h-screen w-full overflow-scroll mx-auto max-w-screen-xl">
          <div className="bg-background h-full border rounded-xl p-4">
            <h3 className="font-bold text-2xl">Account settings</h3>
            <p className="text-sm font-normal leading-snug text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
            <div className="flex flex-col mt-4 gap-4">
              <div className="flex gap-2 items-center">
                <Button variant="secondary">General</Button>
                <Button variant="ghost">Security</Button>
                <Button variant="ghost">Notifications</Button>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
