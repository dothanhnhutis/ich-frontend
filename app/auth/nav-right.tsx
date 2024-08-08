"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserMenu from "./user-menu";
import { useAuthContext } from "@/components/providers/auth-provider";
import { SwitchTheme } from "@/components/switch-theme";
const goToSignInRoute: RegExp = /^\/auth\/(signup|recover|reset-password)$/;

const NavRight = () => {
  const pathName = usePathname();
  const { currentUser } = useAuthContext();
  return (
    <div className="flex items-center gap-2">
      {currentUser ? (
        pathName.startsWith("/auth/reset-password") ? (
          <Link
            href={"/user/profile"}
            className="block text-primary font-medium"
          >
            Go to Profile
          </Link>
        ) : (
          <UserMenu />
        )
      ) : goToSignInRoute.test(pathName) ? (
        <div className="hidden sm:block">
          <div className="text-right pt-30 text-sm">
            <p className="m-0-bottom">
              <span>Already have an account?</span>
              <Link
                href="/auth/signin"
                className="block text-sm text-primary font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <SwitchTheme />
      )}
    </div>
  );
};

export default NavRight;
