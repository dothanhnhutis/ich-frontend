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
import { signIn } from "../actions";

export const SignInForm = ({
  registered,
  email,
}: {
  registered?: string;
  email?: string;
}) => {
  const [emailCheckIsError, setEmailCheckIsError] = useState<boolean>(false);

  const [focused, setFocused] = React.useState<string[]>([]);
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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isError = React.useCallback(
    (field?: "firstName" | "lastName" | "email" | "password" | undefined) => {
      const val = signInSchema.safeParse(formData);
      if (val.success) return [];
      switch (field) {
        case "email":
          return val.error.issues.filter((err) => err.path.includes("email"));
        case "password":
          return val.error.issues.filter((err) =>
            err.path.includes("password")
          );
        default:
          return val.error.issues;
      }
    },
    [formData]
  );

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.type == "blur" && !focused.includes(e.target.name)) {
      setFocused((prev) => [...prev, e.target.name]);
    }
  };

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      email: holdEmail ? prev.email : "",
      password: "",
    }));
    setFocused([]);
    setError({ success: true, message: "" });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignInInput) => {
      return await signIn(input);
    },
    onSuccess({ success }) {
      if (!success) {
        setError({ success: false, message: "Invalid email or password." });
      }
    },
    onMutate() {
      handleReset();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isError().length > 0 || formData.password == "") return;
    if (formData.password.length < 8 || formData.password.length > 40)
      setError({ success: false, message: "Invalid email or password." });
    mutate(formData);
  };

  const handleReActivate = async () => {
    // await reActivateAccount(dataForm.email);
    // setDataForm({
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <>
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
        className="rounded-lg sm:border bg-card text-card-foreground shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-sm transition-all"
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
                className={cn(
                  "focus-visible:ring-0",
                  focused.includes("email") && isError("email").length > 0
                    ? "border-red-500"
                    : ""
                )}
                onBlur={handleOnChangFocus}
              />
              {focused.includes("email") &&
                isError("email").map((error, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                ))}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/recover"
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
                className={cn(
                  focused.includes("password") && isError("password").length > 0
                    ? "border-red-500"
                    : ""
                )}
                onBlur={handleOnChangFocus}
              />
              {focused.includes("password") &&
                isError("password").map((error, idx) => (
                  <p key={idx} className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                ))}
              {!error.success && (
                <p className="text-red-500 text-xs font-bold">
                  {error.message}
                </p>
              )}
            </div>

            <Button variant="default">
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
