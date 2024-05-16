"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const path = usePathname();
  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:w-1/5 ">
      <Button
        variant={/^\/user\/profile$/.test(path) ? "secondary" : "link"}
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/user/profile">Profile</Link>
      </Button>
      <Button
        variant={
          /^\/user\/password-and-security$/.test(path) ? "secondary" : "link"
        }
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/user/password-and-security">Password & security</Link>
      </Button>
      <Button
        variant={/^\/user\/settings$/.test(path) ? "secondary" : "link"}
        className="justify-start text-black dark:text-white"
        asChild
      >
        <Link href="/user/settings">Settings</Link>
      </Button>
    </nav>
  );
};

export default Navigation;
