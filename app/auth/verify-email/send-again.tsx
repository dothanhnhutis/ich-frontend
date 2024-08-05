"use client";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useServerAction } from "zsa-react";
import { sendEmailVerify } from "../actions";

const SendAgainBtn = () => {
  const { isPending, execute } = useServerAction(sendEmailVerify);
  return (
    <Button
      disabled={isPending}
      onClick={async (e) => {
        await execute();
        toast.success(
          "New verification email is successfully sent. Please, check your email..."
        );
      }}
      variant="outline"
      className="rounded-full border-2 border-primary !text-primary font-bold"
    >
      {isPending && (
        <AiOutlineLoading3Quarters className="h-4 w-4 mr-2 animate-spin flex-shrink-0" />
      )}
      Send again
    </Button>
  );
};

export default SendAgainBtn;
