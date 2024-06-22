"use client";
import { Button } from "@/components/ui/button";
import { LockIcon, OctagonAlertIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { SignInGoogleBtn } from "../signin-google-btn";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { SignInData } from "@/schemas/auth";
import {
  SignInRes,
  checkActiveAccount,
  signIn,
} from "@/service/api/auth.service";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignInPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<SignInRes>({
    model: "email",
    success: false,
  });

  const [form, setForm] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (tab.model == "email" && form.email == "") ||
      (tab.model == "password" && form.password == "")
    )
      return;

    setTab((prev) => ({
      ...prev,
      message: undefined,
      reactivateAccount: undefined,
    }));
    startTransistion(async () => {
      const res =
        tab.model == "email"
          ? await checkActiveAccount({ email: form.email })
          : await signIn(form);
      if (res.success) {
        router.push(DEFAULT_LOGIN_REDIRECT);
      } else {
        setTab(res);
      }
    });
  };
  return (
    <div className="p-4 sm:p-8">
      {tab.reactivateAccount && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/20 sm:rounded-xl sm:max-w-[570px] sm:mx-auto mb-10 p-4">
          <OctagonAlertIcon className="size-6 text-red-500" />
          <p className="text-sm">
            Your account is currently closed. If you would like to re-activate
            your account, click{" "}
            <Link href="/auth/send-email" className="underline">
              here
            </Link>
            .
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all"
      >
        {tab.model == "email" ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Log in to ICH</span>
            </h1>

            <div className="flex gap-4 items-center border rounded-lg h-10 px-4">
              <UserIcon className="size-4" />
              <input
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                value={form.email}
                type="email"
                placeholder="Email"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            <Button disabled={isPending}>
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              )}{" "}
              Continue
            </Button>
            <div className="relative my-2 py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>
            <SignInGoogleBtn />
            <footer className="mt-20">
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-background px-2 text-muted-foreground">
                    Don't have an account?
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary font-bold rounded-lg border-2 hover:text-primary"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Welcome</span>
            </h1>

            <p className="text-center">{form.email}</p>
            <div
              className={cn(
                "flex gap-4 items-center border rounded-lg h-10 px-4",
                tab.message ? "border-red-500" : ""
              )}
            >
              <LockIcon className="size-4" />
              <input
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
                autoComplete="off"
                placeholder="Password"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            {tab.message && (
              <p className="text-red-500 text-xs -mt-4">{tab.message}</p>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me logged in
                </label>
              </div>
              <Button asChild variant="link" className="">
                <Link href={`/auth/recover?email=${form.email}`}>
                  Forgot password?
                </Link>
              </Button>
            </div>

            <Button disabled={isPending || form.password == ""}>
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              )}{" "}
              Log in
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setForm({ email: "", password: "" });
                setTab({
                  model: "email",
                  success: false,
                });
              }}
            >
              <span>Not you?</span>
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignInPage;
