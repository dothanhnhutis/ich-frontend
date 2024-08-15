"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SwitchTheme } from "@/components/switch-theme";
const goToSignInRoute: RegExp = /^\/auth\/(signup|recover|reset-password)$/;

const NavRight = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center gap-2">
      {goToSignInRoute.test(pathName) ? (
        <SwitchTheme />
      ) : (
        // <div className="hidden sm:block">
        //   <div className="text-right pt-30 text-sm">
        //     <p className="m-0-bottom">
        //       <span>Already have an account?</span>
        //       <Link
        //         href="/auth/signin"
        //         className="block text-sm text-primary font-medium"
        //       >
        //         Sign In
        //       </Link>
        //     </p>
        //   </div>
        // </div>
        <SwitchTheme />
      )}
    </div>
  );
};

export default NavRight;
