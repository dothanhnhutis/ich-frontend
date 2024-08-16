"use client";
import { LoaderPinwheelIcon, OctagonAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { SignInInput, signInSchema } from "@/schemas/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ContinueBtn from "../continue-btn";
import PasswordInput from "../password-input";
import { useMutation } from "@tanstack/react-query";
import { reActivateAccount, signIn } from "../actions";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const SignInForm = ({
  registered,
  email,
}: {
  registered?: string;
  email?: string;
}) => {
  const [accountSuspended, setAccountSuspended] = useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = React.useState<SignInInput>({
    email: registered || email || "",
    password: "",
  });

  const [error, setError] = useState<{ success: boolean; message: string }>({
    success: true,
    message: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      success: true,
      message: "",
    });
    if (e.target.name == "email") setAccountSuspended(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      email: holdEmail ? prev.email : "",
      password: "",
    }));
    setAccountSuspended(false);
    setError({ success: true, message: "" });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignInInput) => {
      return await signIn(input);
    },
    onSuccess({ success, data }) {
      if (!success) {
        if (data.message == "Your account is currently closed") {
          handleReset(true);
          setAccountSuspended(true);
        } else {
          setError({ success: false, message: data.message });
          handleReset();
        }
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") return;
    if (
      !z.string().email().safeParse(formData.email).success ||
      formData.password.length < 8 ||
      formData.password.length > 40
    )
      setError({ success: false, message: "Invalid email or password." });
    mutate(formData);
  };

  const handleReActivate = async () => {
    await reActivateAccount(formData.email);
    handleReset();
  };

  return (
    <>
      {accountSuspended && (
        <div className="flex items-center gap-3 rounded-lg bg-amber-200 text-orange-500 sm:rounded-xl sm:max-w-md mx-4 sm:mx-auto transition-all mt-4 mb-10 p-4 ">
          <OctagonAlertIcon className="size-6  flex flex-shrink-0" />
          <p className="text-sm ">
            Your account is currently closed. If you would like to reactivate
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
        className="rounded-lg sm:border bg-card text-card-foreground shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
      >
        <div className="flex flex-col space-y-1.5">
          <h3 className="font-semibold tracking-tight text-2xl">Login</h3>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>

        {registered && (
          <div className="text-orange-400 text-sm">
            We've found an existing ICH account with this email address. Please
            continue to log in with your account email and password below.
          </div>
        )}

        <div className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="test@example.com"
                onChange={handleOnchange}
                value={formData.email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={`/recover${
                    formData.email == "" ? "" : "?email=" + formData.email
                  }`}
                  className="ml-auto inline-block text-sm underline "
                >
                  Forgot your password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                placeholder="********"
                onChange={handleOnchange}
                value={formData.password}
              />

              {!error.success && (
                <p className="text-red-500 text-xs font-bold">
                  {error.message}
                </p>
              )}
            </div>

            <Button disabled={isPending} variant="default">
              {isPending ? (
                <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0" />
              ) : (
                "Login"
              )}
            </Button>
            <ContinueBtn label="Login with Google" redir="/login" />
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link className="underline" href="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};
