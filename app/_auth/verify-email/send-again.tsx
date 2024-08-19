"use client";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { sendEmailVerify } from "@/service/api/auth.service";
import { LoaderPinwheelIcon } from "react-icons/ai";

const SendAgainBtn = () => {
  const [isPending, startTransistion] = useTransition();
  return (
    <Button
      disabled={isPending}
      onClick={(e) => {
        startTransistion(async () => {
          await sendEmailVerify();
          toast.success(
            "New verification email is successfully sent. Please, check your email..."
          );
        });
      }}
      variant="outline"
      className="rounded-full border-2 border-primary !text-primary font-bold"
    >
      {isPending && (
        <LoaderPinwheelIcon className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
      )}
      Send again
    </Button>
  );
};

export default SendAgainBtn;
