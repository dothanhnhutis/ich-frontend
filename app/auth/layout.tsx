import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/images/logos/logo.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="hidden lg:flex flex-col justify-between basis-1/2 border-r h-full p-4 bg-company bg-no-repea bg-cover bg-right-bottom">
        <div className="flex items-center gap-3">
          <Link href="/" prefetch={true}>
            <Image
              priority
              src={LogoImage.src}
              width={60}
              height={60}
              alt="logo"
              className="w-full size-auto"
            />
          </Link>
        </div>
        {/* <blockquote className="text-white">
          <p>
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="text-sm mt-2">Công ty TNHH MTV TM Sản Xuất I.C.H</p>
        </blockquote> */}
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
