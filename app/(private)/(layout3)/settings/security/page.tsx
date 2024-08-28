"use client";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SecurityPage = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Email address</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            The email address association with your account.
          </p>
        </div>
        <div className="flex gap-4 items-center justify-between w-full">
          <div className="text-sm">
            <p>{currentUser?.email}</p>
            {!currentUser!.emailVerified ? (
              <div className="text-red-500">Unverified</div>
            ) : (
              <div className="text-green-500">Verified</div>
            )}
          </div>
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Password</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Set a unique password to protect your account.
          </p>
        </div>
        <Button className="rounded-full " variant="outline">
          {currentUser?.hasPassword ? "Change password" : "Set password"}
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">Connected accounts</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Another way to log in to your account.
          </p>
        </div>
        <div className="flex gap-4 w-full justify-between">
          <div className="flex items-center gap-2 opacity-50">
            <div className="p-1 bg-white rounded-full">
              <FcGoogle className="size-8" />
            </div>
            <p>Google</p>
          </div>
          <Button className="rounded-full " variant="outline">
            Connect
          </Button>
        </div>
      </div>
      <div className="flex w-full gap-4 border-b py-4">
        <div className="w-full">
          <p className="font-bold">2-factor authentication (2FA)</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Make your account extra secure. Along with your password, you'll
            need to enter a code
          </p>
        </div>

        <Switch checked={currentUser?.mFAEnabled} />
      </div>
      <div className="flex w-full gap-4 py-4">
        <div className="w-full">
          <p className="font-bold">Deactivate my account</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This will shut down your account. Your account will be reactive when
            you sign in again.
          </p>
        </div>

        <Button className="rounded-full" variant="destructive">
          Deactivate
        </Button>
      </div>
    </>
  );
};

export default SecurityPage;
