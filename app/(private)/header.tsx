import Link from "next/link";
import React from "react";
import { Logo } from "@/components/logo";
import { SwitchTheme } from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import { BellIcon, MenuIcon } from "lucide-react";
import { CurrentUser } from "@/schemas/user";
import UserMenu from "../auth/user-menu";

const UserHeader = ({
  currentUser,
}: {
  currentUser: CurrentUser | undefined;
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 border-b bg-background">
      <nav className="flex justify-between items-center p-3 h-[72px]">
        <Logo className="hidden md:block" />
        <div className="hidden md:flex items-center space-x-6 ml-6 text-sm font-medium">
          {currentUser?.role != "CUSTOMER" && (
            <Link
              prefetch={false}
              href="/manager"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Manager
            </Link>
          )}
          {currentUser?.role == "ADMIN" && (
            <Link
              prefetch={false}
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          )}

          <Link
            prefetch={false}
            href="/contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Cart
          </Link>
        </div>
        <Button variant="ghost" className="md:hidden">
          <MenuIcon className="w-5 h-5" />
        </Button>

        <div className="flex flex-1 items-center justify-end gap-4 ">
          <BellIcon className="size-5" />
          <SwitchTheme />
          {currentUser && <UserMenu currentUser={currentUser} />}
        </div>
      </nav>
    </header>
  );
};

export default UserHeader;
