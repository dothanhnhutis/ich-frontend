"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const goToSignInRoute: RegExp = /^\/auth\/(signup|recover)$/;

const NavRight = () => {
  const pathName = usePathname();
  if (goToSignInRoute.test(pathName))
    return (
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
    );
};

export default NavRight;
