"use client";
import { LockIcon, OctagonAlertIcon, UserIcon } from "lucide-react";
import { emailCheck, reActivateAccount, signIn, SignInInput } from "../actions";
import { useServerAction } from "zsa-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { SignInGoogleBtn } from "@/app/_auth2/signin-google-btn";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export const SignInForm = () => {
  const {
    isPending,
    execute: executeSubmit,
    isError,
    reset,
  } = useServerAction(signIn);
  const {
    isPending: emailCheckIsPending,
    isSuccess: emailCheckIsSuccess,
    isError: emailCheckIsError,
    execute: emailCheckExecute,
    reset: emailCheckReset,
  } = useServerAction(emailCheck);
  const { execute } = useServerAction(reActivateAccount);
  const [tab, setTab] = React.useState<"email" | "password">("email");
  const [dataForm, setDataForm] = React.useState<Required<SignInInput>>({
    email: "",
    password: "",
  });
  const [reActivateEmail, setReActivateEmail] = React.useState<string>("");

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tab == "email") {
      emailCheckExecute({ email: dataForm.email });
    } else {
      executeSubmit(dataForm);
    }
  };

  const handleBack = () => {
    setTab("email");
    setDataForm({
      email: "",
      password: "",
    });
    emailCheckReset();
  };

  useEffect(() => {
    if (emailCheckIsSuccess) {
      setTab("password");
    }
    if (emailCheckIsError)
      setDataForm({
        email: "",
        password: "",
      });
  }, [emailCheckIsSuccess, emailCheckIsError]);

  return (
    <div className="p-4 sm:p-8">
      {emailCheckIsError && (
        <div className="flex items-center gap-3 rounded-lg bg-destructive/20 sm:rounded-xl sm:max-w-[570px] sm:mx-auto mb-10 p-4">
          <OctagonAlertIcon className="size-6 text-red-500" />
          <p className="text-sm">
            Your account is currently closed. If you would like to re-activate
            your account, click{" "}
            <button
              onClick={() => {
                execute({ email: reActivateEmail });
                setReActivateEmail("");
              }}
              className="underline"
            >
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
        {tab == "email" ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
              <span>Log in to ICH</span>
            </h1>
            {/* <div className="text-orange-400 text-sm">
              We've found an existing ICH account with this email address.
              Please continue to log in with your account email and password
              below.
            </div> */}

            <div className="flex gap-4 items-center border rounded-lg h-10 px-4">
              <UserIcon className="size-4" />

              <input
                onChange={handleOnchange}
                value={dataForm.email}
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            <Button disabled={isPending}>
              {emailCheckIsPending ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              ) : (
                <span>Continue</span>
              )}
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
            <p className="text-center">{dataForm.email}</p>
            {/* <div className="text-orange-400 text-sm">
              That Google account isn't currently associated with an ICH
              account. Log in using your ICH login first, then link your Google
              account for future use.
            </div> */}
            <div
              className={cn(
                "flex gap-4 items-center border rounded-lg h-10 px-4",
                tab == "password" && isError ? "border-red-500" : ""
              )}
            >
              <LockIcon className="size-4" />
              <input
                value={dataForm.password}
                onChange={handleOnchange}
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                className="size-full focus-visible:outline-0 bg-transparent"
              />
            </div>
            {tab == "password" && isError && (
              <p className="text-red-500 text-xs -mt-4">
                Invalid email or password
              </p>
            )}

            <Button disabled={isPending}>
              {isPending ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              ) : (
                <span>Log in</span>
              )}
            </Button>
            <div className="flex flex-col sm:flex-row sm:justify-between items-center">
              <Button variant="link" type="button" onClick={handleBack}>
                <span>Not you?</span>
              </Button>
              <Button asChild variant="link" className="">
                <Link href={`/auth/recover?email=${dataForm.email}`}>
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
