import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/images/logos/logo.png";
import { UserIcon } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex h-screen">
      <div className="hidden lg:flex flex-col justify-between basis-1/2 border-r h-full p-4 bg-company bg-no-repea bg-cover bg-right-bottom">
        {/* <div className="flex items-center gap-3">
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
        </div> */}
        {/* <blockquote className="text-white">
          <p>
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="text-sm mt-2">Công ty TNHH MTV TM Sản Xuất I.C.H</p>
        </blockquote> */}
      </div>
      {/* {children} */}
      <div className="lg:basis-1/2">
        <header className="sticky top-0 left-0 right-0 ">
          <div className="flex justify-center items-center md:justify-start px-4 py-2 lg:">
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
        <div className="mx-auto md:w-[400px]">
          <div className="flex flex-col flex-grow p-4">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              <span>Log in to Upwork</span>
            </h1>
            <div className="flex items-center w-full">
              <UserIcon className="size-4" />
              <input type="text" className="pl-12 pr-4 h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
