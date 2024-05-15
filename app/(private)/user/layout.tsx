import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex space-y-4 p-4 lg:gap-4">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 lg:w-1/5 ">
        <Button
          variant="secondary"
          className="justify-start text-black dark:text-white"
          asChild
        >
          <Link href="/user/profile">Profile</Link>
        </Button>
        <Button
          variant="link"
          className="justify-start text-black dark:text-white"
          asChild
        >
          <Link href="/user/password-and-security">Password & security</Link>
        </Button>
        <Button
          variant="link"
          className="justify-start text-black dark:text-white"
          asChild
        >
          <Link href="/user/setting">Setting</Link>
        </Button>
      </nav>
      <div className="lg:mx-auto lg:max-w-screen-lg w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
