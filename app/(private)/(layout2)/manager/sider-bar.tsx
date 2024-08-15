"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { ClipboardSignatureIcon, PackageIcon, UsersIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/auth-provider";

const permissions: {
  [index: string]: {
    icon: JSX.Element;
    href: string;
    label: string;
    isActive: (path: string) => boolean;
  }[];
} = {
  Admin: [
    {
      icon: <PackageIcon className="lg:mr-2 size-6" />,
      href: "/manager/products",
      label: "Product",
      isActive: (path: string) => {
        return /^\/manager\/products(\/create|.+\/edit)?$/.test(path);
      },
    },
    {
      icon: <ClipboardSignatureIcon className="lg:mr-2 size-6" />,
      href: "/manager/posts",
      label: "Post",
      isActive: (path: string) => {
        return /^\/manager\/posts(\/create|.+\/edit)?$/.test(path);
      },
    },
    {
      icon: <UsersIcon className="lg:mr-2 size-6" />,
      href: "/manager/users",
      label: "User",
      isActive: (path: string) => {
        return /^\/manager\/users(\/create|.+\/edit)?$/.test(path);
      },
    },
  ],
  Bloger: [
    {
      icon: <ClipboardSignatureIcon className="lg:mr-2 size-6" />,
      href: "/manager/posts",
      label: "Post",
      isActive: (path: string) => {
        return /^\/manager\/posts(\/create|.+\/edit)?$/.test(path);
      },
    },
  ],
};

export const ManagerSiderBar = () => {
  const pathName = usePathname();
  const { currentUser } = useAuthContext();

  if (!currentUser) return null;

  return (
    <div className="sticky top-[73px] h-[calc(100vh-73px)] z-50 transition-all bg-background">
      <ScrollArea className="flex flex-shrink-0 lg:w-[200px] h-full border-r">
        <div className="flex flex-col gap-2 text-popover-foreground p-2">
          <TooltipProvider delayDuration={100} disableHoverableContent={true}>
            {permissions[currentUser.role].map((p, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={p.href}
                    className={cn(
                      "flex items-center px-2 py-1.5 rounded-md",
                      p.isActive(pathName)
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {p.icon}
                    <span className="text-base font-normal hidden lg:inline">
                      {p.label}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden"
                >
                  <p>{p.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </ScrollArea>
    </div>
  );
};
