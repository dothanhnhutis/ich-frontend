import Link from "next/link";
import React from "react";
import Image from "next/image";
import LogoImage from "@/images/logos/logo.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 left-0 right-0 backdrop-blur bg-background/60">
        <div className="flex justify-center items-center sm:justify-start px-4 py-2 mx-auto max-w-screen-2xl">
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
        </div>
      </header>
      {children}
    </div>
  );
};

export default AuthLayout;
