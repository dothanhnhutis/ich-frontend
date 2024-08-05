"use client";
import { Button } from "@/components/ui/button";
import configs from "@/config";
import React from "react";
import { FcGoogle } from "react-icons/fc";

export const SignInGoogleBtn = ({ redir }: { redir: string }) => {
  const onClick = () => {
    document.location.href = `${configs.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/google?redir=${redir}`;
  };
  return (
    <Button
      type="button"
      variant="outline"
      className="relative rounded-lg p-0"
      onClick={onClick}
    >
      <FcGoogle className="size-9 p-1 top-0 left-0 absolute" />
      <span>Continue with Google</span>
    </Button>
  );
};
