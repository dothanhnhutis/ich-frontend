"use client";
import React from "react";
import { Logo } from "@/components/logo";
import { SwitchTheme } from "@/components/switch-theme";
import { useAuthContext } from "@/components/providers/auth-provider";
import UserMenu from "./user-menu";

const VerifyEmailLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthContext();

  return (
    <div className="relative">
      <header className="sticky top-0 left-0 right-0 z-50 border-b backdrop-blur bg-background/60">
        <nav className="flex justify-between items-center p-3 h-[72px]">
          <Logo />

          <div className="flex flex-1 items-center justify-end gap-4 ">
            <SwitchTheme />

            {currentUser && <UserMenu currentUser={currentUser} />}
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default VerifyEmailLayout;
