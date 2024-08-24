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
    <div className="relative sm:flex">
      <div className="flex-shrink-0 sticky top-0 left-0 right-0 z-50 sm:top-0 sm:left-0 sm:bottom-0 backdrop-blur bg-background/60 sm:w-[200px] sm:h-screen flex items-center justify-between sm:block">
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
      <div className="w-full overflow-x-hidden relative">
        <div className="sticky top-0 left-0 right-0 z-50 backdrop-blur bg-background/60 hidden p-2 sm:flex sm:justify-end sm:items-center sm:gap-2">
          <div className="p-2 rounded-full hover:bg-primary/20 hover:text-primary">
            <BellIcon className=" flex-shrink-0 size-6" />
          </div>
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
        </div>
        {children}
      </div>
    </div>
  );
};

export default V2Layout;
