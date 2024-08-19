"use client";
import Link from "next/link";
import { toast } from "sonner";
import React, { useState, useTransition } from "react";
import { LoaderPinwheelIcon } from "react-icons/ai";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recover } from "@/service/api/auth.service";

const RecoverForm = () => {
  const [isPending, startTransistion] = useTransition();
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await recover(email);
      setEmail("");
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Username or Email</Label>
        <Input
          type="email"
          placeholder="Email"
          className="focus-visible:ring-offset-0 focus-visible:ring-transparent"
        />
      </div>
      <div className="flex justify-end items-center mt-4">
        <Link href="/login" className={buttonVariants({ variant: "link" })}>
          Cancel
        </Link>
        <Button disabled={isPending}>
          {isPending ? (
            <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0" />
          ) : (
            "Send Email"
          )}
        </Button>
      </div>
    </form>
  );
};

export default RecoverForm;
