"use client";
import { LockIcon, OctagonAlertIcon, UserIcon } from "lucide-react";
import { reActivateAccount, signIn } from "../actions";
import { useServerAction } from "zsa-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { SignInGoogleBtn } from "@/app/auth/signin-google-btn";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

export const SignInForm = () => {
  const { isPending, isSuccess, data, error, isError, executeFormAction } =
    useServerAction(signIn);
  const { execute } = useServerAction(reActivateAccount);
  const [tab, setTab] = React.useState<"email" | "password">("email");

  console.log(error);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-3 rounded-lg bg-destructive/20 sm:rounded-xl sm:max-w-[570px] sm:mx-auto mb-10 p-4">
        <OctagonAlertIcon className="size-6 text-red-500" />
        <p className="text-sm">
          Your account is currently closed. If you would like to re-activate
          your account, click{" "}
          <button
            onClick={() => {
              execute({ email: "gaconght001@gmail.com" });
            }}
            className="underline"
          >
            here
          </button>
          .
        </p>
      </div>

      <form
        action={executeFormAction}
        className="flex flex-col gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all"
      >
        {tab == "email" ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Log in to ICH</span>
            </h1>
            <div className="text-orange-400 text-sm">
              We've found an existing ICH account with this email address.
              Please continue to log in with your account email and password
              below.
            </div>
            <div className="flex gap-4 items-center border rounded-lg h-10 px-4">
              <UserIcon className="size-4" />
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            <Button disabled={isPending}>
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              )}
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
            <SignInGoogleBtn redir={"/auth/signin"} />
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
            <p className="text-center">form.email</p>
            <div className="text-orange-400 text-sm">
              That Google account isn't currently associated with an ICH
              account. Log in using your ICH login first, then link your Google
              account for future use.
            </div>
            <div
              className={cn(
                "flex gap-4 items-center border rounded-lg h-10 px-4",
                false ? "border-red-500" : ""
              )}
            >
              <LockIcon className="size-4" />
              <input
                // value={form.password}
                // onChange={(e) =>
                //   setForm((prev) => ({ ...prev, password: e.target.value }))
                // }
                name="password"
                autoComplete="off"
                placeholder="Password"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            <p className="text-red-500 text-xs -mt-4">tab.message</p>
            <Button disabled={isPending}>
              {true && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              )}
              Log in
            </Button>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center">
              <Button
                variant="link"
                // onClick={() => {
                //   setForm({ email: "", password: "" });
                //   setTab({
                //     model: "email",
                //     success: false,
                //   });
                // }}
              >
                <span>Not you?</span>
              </Button>
              <Button asChild variant="link" className="">
                <Link href={`/auth/recover?email=sdasdasd`}>
                  Forgot password?
                </Link>
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
