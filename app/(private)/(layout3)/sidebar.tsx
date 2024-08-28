"use client";
import { ToggleTheme } from "@/components/switch-theme";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BellIcon,
  ClipboardSignatureIcon,
  LucideIcon,
  MenuIcon,
  MoonIcon,
  PackageIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";
import React from "react";
import UserMenu from "./user-menu";
import { cn } from "@/lib/utils";
import NavLink from "./nav-link";
import { User } from "@/schemas/user";
import { useAuthContext } from "@/components/providers/auth-provider";

const permission: {
  roles: User["role"][];
  href: string;
  regex: RegExp;
  title: string;
  Icon: LucideIcon;
}[] = [
  {
    roles: ["Admin"],
    href: "/manage/users",
    regex: /^\/manage\/users(\/create|.+\/edit)?$/,
    title: "Users",
    Icon: UsersIcon,
  },
  {
    roles: ["Admin", "Manager", "Bloger"],
    href: "/manage/posts",
    regex: /^\/manage\/posts(\/create|.+\/edit)?$/,
    title: "Posts",
    Icon: ClipboardSignatureIcon,
  },
  {
    roles: ["Admin", "Manager", "Saler"],
    href: "/manage/products",
    regex: /^\/manage\/products(\/create|.+\/edit)?$/,
    title: "Products",
    Icon: PackageIcon,
  },
];

const SideBar = () => {
  const { currentUser } = useAuthContext();
  return (
    <div className="sticky top-0 left-0 w-full z-50 flex md:block justify-between items-center backdrop-blur bg-background/60 md:w-[200px] md:h-screen md:flex-shrink-0 ">
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
      <div className="flex items-center gap-2 px-2 md:hidden">
        <div className="flex items-center p-2 rounded-full hover:bg-primary/20 hover:text-primary">
          <BellIcon className="block flex-shrink-0 size-6" />
        </div>
        <UserMenu isMobile />

        <div className="flex items-center p-2 rounded-full hover:bg-primary/20 hover:text-primary">
          <MenuIcon className="block flex-shrink-0 size-6" />
        </div>
      </div>
      <ScrollArea className="relative hidden md:block md:mt-5 md:px-2 h-[calc(100vh_-_182px)]">
        {permission
          .filter((p) => p.roles.includes(currentUser!.role))
          .map((nav, idx) => (
            <NavLink
              key={idx}
              href={nav.href}
              regex={nav.regex}
              title={nav.title}
              Icon={nav.Icon}
            />
          ))}
      </ScrollArea>

      <div className="absolute hidden md:block left-0 bottom-0 right-0 p-2 bg-background">
        <Label className="flex items-center p-2 rounded-lg mb-1 last:mb-0 hover:bg-accent hover:text-accent-foreground">
          <MoonIcon className="hidden dark:block flex-shrink-0 size-6 md:mr-2" />
          <SunIcon className=" dark:hidden block flex-shrink-0 size-6 md:mr-2" />
          <p className="text-sm w-full">Theme</p>
          <ToggleTheme />
        </Label>

        <NavLink
          Icon={SettingsIcon}
          href="/settings/profile"
          regex={/^\/settings(\/profile|\/security)?$/}
          title="Settings"
        />
      </div>
    </div>
  );
};

export default SideBar;
