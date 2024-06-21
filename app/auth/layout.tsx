import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoImage from "@/images/logos/logo.png";
import { getCurrentUser } from "@/service/api/user.service";
import UserMenu from "./user-menu";
import NavRight from "./nav-right";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 left-0 right-0 backdrop-blur bg-background/60">
        <div className="flex justify-center items-center sm:justify-between px-4 py-2 mx-auto max-w-screen-2xl">
          <Link href="/" prefetch={true}>
            <Image
              priority
              src={LogoImage.src}
              width={48}
              height={48}
              alt="logo"
              className="w-full size-auto"
            />
          </Link>
          {currentUser && <UserMenu currentUser={currentUser} />}
          <NavRight />
        </div>
      </header>
      {children}
    </div>
  );
};

export default AuthLayout;
