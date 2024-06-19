"use client";
import { Button } from "@/components/ui/button";
import { LockIcon, UserIcon } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { SignInGoogleBtn } from "./signin-google-btn";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { SignInData } from "@/schemas/auth";
import { signIn } from "@/service/api/auth.service";

const SignInPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<string>("email");
  const [form, setForm] = useState<SignInData>({
    email: "",
  });
  const [isPending, startTransistion] = useTransition();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
  }, [form.password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransistion(async () => {
      const res = await signIn(form);
      console.log(res);
      // if (res.success) {
      //   router.refresh();
      // } else {
      //   setError(res.message);
      // }
    });
  };
  return (
    <div className="p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all"
      >
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
            className="size-full focus-visible:outline-0"
          />
        </div>
        <Button>Continue</Button>
        <div className="relative my-2 py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
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
      </form>

      <div className="flex flex-col gap-6 sm:border sm:rounded-xl sm:max-w-[570px] sm:mx-auto sm:px-12 sm:py-4 transition-all">
        <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
          <span>Welcome</span>
        </h1>

        <p className="text-center">gaconght@gmail.com</p>
        <div className="flex gap-4 items-center border rounded-lg h-10 px-4">
          <LockIcon className="size-4" />
          <input
            type="password"
            autoComplete="off"
            placeholder="Password"
            className="size-full focus-visible:outline-0"
          />
        </div>
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
            <Link href="/auth/recover">Forgot password?</Link>
          </Button>
        </div>
        <Button>Log in</Button>
        <Button variant="link">
          <span>Not you?</span>
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
