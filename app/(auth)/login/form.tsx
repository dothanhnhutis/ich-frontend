"use client";
import { LockIcon, OctagonAlertIcon, UserIcon } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState, useTransition } from "react";
import { SignInInput } from "@/schemas/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import configs from "@/config";
import {
  clearEmailRegistered,
  emailCheck,
  reActivateAccount,
  signIn,
} from "@/app/auth/actions";

export const SignInForm = ({ registered }: { registered?: string }) => {
  const [emailCheckIsError, setEmailCheckIsError] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<boolean>(false);

  const [tab, setTab] = React.useState<"email" | "password">(
    registered ? "password" : "email"
  );

  const [dataForm, setDataForm] = React.useState<Required<SignInInput>>({
    email: registered || "",
    password: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tab == "email" && dataForm.email == "") return;
    if (tab == "password" && dataForm.password == "") return;
    startTransistion(async () => {
      if (tab == "email") {
        if (await emailCheck({ email: dataForm.email })) {
          setEmailCheckIsError(false);
          setTab("password");
        } else {
          setEmailCheckIsError(true);
          setDataForm({
            email: "",
            password: "",
          });
        }
      } else {
        const { success } = await signIn(dataForm);
        if (!success) {
          setSignInError(true);
        }
      }
    });
  };

  const handleBack = async () => {
    await clearEmailRegistered();
    setTab("email");
    setDataForm({
      email: "",
      password: "",
    });
    setSignInError(false);
  };

  const handleReActivate = async () => {
    await reActivateAccount(dataForm.email);
    setDataForm({
      email: "",
      password: "",
    });
  };

  const onClick = () => {
    document.location.href = `${configs.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/google?redir=/auth/signin`;
  };

  return (
    <div className="p-4 sm:p-8">
      {emailCheckIsError && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/20 sm:rounded-xl sm:max-w-[570px] sm:mx-auto mb-10 p-4">
          <OctagonAlertIcon className="size-6 text-red-500" />
          <p className="text-sm">
            Your account is currently closed. If you would like to re-activate
            your account, click{" "}
            <button onClick={handleReActivate} className="underline">
              here
            </button>
            .
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all"
      >
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {registered && (
          <div className="text-orange-400 text-sm">
            We've found an existing ICH account with this email address. Please
            continue to log in with your account email and password below.
          </div>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input placeholder="test@example.com" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Password</Label>
              <Link
                href="/auth/recover"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input placeholder="******" />
          </div>
          <Button variant="default">Login</Button>
          <Button variant="outline" onClick={onClick}>
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link className="underline" href="/auth/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};
