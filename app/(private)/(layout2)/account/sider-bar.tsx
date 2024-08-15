"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const UserSiderBar = () => {
  const path = usePathname();
  return (
    <nav className="flex gap-2 sm:flex-col overflow-x-scroll sm:overflow-x-visible sticky top-[73px] z-50 left-0 sm:h-[calc(100vh_-_73px)] p-3 lg:w-1/5 backdrop-saturate-[1.8] backdrop-blur bg-background/50">
      <Button
        variant={/^\/account\/profile$/.test(path) ? "secondary" : "link"}
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/account/profile">Profile</Link>
      </Button>
      <Button
        variant={
          /^\/account\/password-and-security$/.test(path) ? "secondary" : "link"
        }
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/account/password-and-security">Password & security</Link>
      </Button>
      <Button
        variant={/^\/account\/settings$/.test(path) ? "secondary" : "link"}
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/account/settings">Settings</Link>
      </Button>
    </nav>
  );
};

export default UserSiderBar;
