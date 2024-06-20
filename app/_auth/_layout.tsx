import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/images/logos/logo.png";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="sticky top-0 left-0 right-0">
        <div className="flex justify-center items-center sm:justify-start px-4 py-2 ">
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
      <div className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all sm:p-8">
        <div className="flex flex-col flex-grow sm:border sm:rounded-xl sm:py-4 sm:px-12 sm:flex-grow-0 sm:col-start-3 sm:col-end-10 mx-auto w-full sm:max-w-[570px] p-4">
          <div className="flex flex-col flex-grow space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Log in to ICH</span>
            </h1>
            <div className="grid grid-flow-col grid-cols-[48px_auto_16px] w-full">
              <div className="relative flex items-center pl-4 col-[1_/_1] row-[1_/_1]">
                <UserIcon className="size-4" />
              </div>
              <input
                placeholder="Email"
                type="text"
                className="relative outline-0 bg-transparent pl-12 pr-4 h-10 w-full flex items-center rounded-lg border col-span-full row-[1_/_1]"
              />
              <div className="flex items-center justify-end pr-2 col-[3_/_4] row-[1_/_1]"></div>
            </div>
            <Button className="rounded-lg">Continue</Button>
            <div className="relative my-2 py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="relative rounded-lg p-0 "
            >
              <FcGoogle className="size-9 p-1 top-0 left-0 absolute" />
              <span>Continue with Google</span>
            </Button>
          </div>
          <footer className="mt-20">
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-muted-foreground">
                  Don't have an ICH account?
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant="outline"
                className="rounded-xl border-2 mt-3 mb-6 border-primary text-primary font-bold hover:text-primary"
              >
                Sign Up
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
