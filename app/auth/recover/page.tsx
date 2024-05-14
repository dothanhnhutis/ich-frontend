"use client";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { recover } from "@/service/api/auth.service";
import { toast } from "sonner";

const RecoverPage = () => {
  const [isPending, startTransistion] = useTransition();
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await recover(email);
      setEmail("");
      if (res.statusCode == 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <CardWrapper
      headerLaybel="Find your account"
      headerDescription="Enter your recovery email"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-visible:ring-transparent"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <Button disabled={isPending || email.length == 0}>
          {isPending ? (
            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </CardWrapper>
  );
};

export default RecoverPage;
