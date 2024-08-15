"use client";
import React, { useEffect } from "react";
import EmailSVG1 from "@/assets/svgs/email1";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sendReactivateAccount } from "@/service/api/auth.service";
export const Send = () => {
  useEffect(() => {
    sendReactivateAccount();
  }, []);
  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all">
        <div className="inline-block mx-auto w-[145px] h-[130px] min-w-[145px] min-h-[130px]">
          <EmailSVG1 />
        </div>
        <h2 className="font-bold text-5xl text-center">Email sent</h2>
        <p>
          We’ve sent an email to your email address. Follow the steps provided
          in the email to reactivate your account.
        </p>
        <Button asChild>
          <Link href={"/login"} className="my-10 px-6 rounded-xl">
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
};
