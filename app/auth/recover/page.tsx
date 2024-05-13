"use client";
import React, { useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RecoverPage = () => {
  const [isPending, startTransistion] = useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(() => {});
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
            className="focus-visible:ring-transparent"
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <Button>
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
