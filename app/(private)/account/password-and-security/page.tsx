"use client";
import React from "react";
import { CheckIcon, MailIcon } from "lucide-react";
import { PasswordForm } from "./form";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const PasswordAndSecurityPage = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <h3 className="text-lg font-medium">Password & security</h3>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            disabled={true}
            value={currentUser!.email}
            type="email"
            name="name"
            className="focus-visible:ring-transparent"
          />
          <CheckIcon className="text-green-400" />
        </div>
        <p className="text-xs text-muted-foreground">
          This email will be your login information
        </p>
        <div className="flex gap-4 flex-wrap">
          <Button disabled>
            <MailIcon className="size-4 mr-2" /> Change email
          </Button>
          <PasswordForm />
        </div>

        <div>
          <h3 className="font-medium">Session Manager</h3>
          <p className="text-xs text-muted-foreground">
            You have logged in or logged in on the following devices within 28
            days.
          </p>
        </div>
      </div>
    </>
  );
};

export default PasswordAndSecurityPage;
