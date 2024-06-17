"use client";
import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import LogoImage from "@/images/logos/logo.png";
import { CircleAlertIcon, LockIcon, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SignInData, signInSchema } from "@/schemas/auth";
import { cn } from "@/lib/utils";
import { signIn } from "@/service/api/auth.service";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SignInGoogleBtn } from "./signin-google-btn";

const SignInPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<string>("email");
  const [form, setForm] = useState<SignInData>({
    email: "",
    password: "",
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
      if (res.success) {
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <header className="sticky top-0 left-0 right-0">
        <div className="flex justify-center items-center sm:justify-start px-4 py-2 ">
          <Link href="/" prefetch={true}>
            <Image
              priority
              src={LogoImage.src}
              width={48}
              height={48}
              alt="logo"
              className="w-full size-auto"
            />
          </Link>
        </div>
      </header>
      <Tabs defaultValue={tab} onValueChange={(v) => setTab(v)} value={tab}>
        <div className="flex flex-col flex-grow sm:flex-grow-0 sm:grid grid-cols-12 transition-all sm:p-8">
          <TabsContent value="email" asChild>
            <div className="flex flex-col flex-grow sm:border sm:rounded-xl sm:py-4 sm:px-12 sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-[570px] p-4">
              <div className="flex flex-col flex-grow space-y-6">
                <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
                  <span>Log in to ICH</span>
                </h1>
                <div className="grid grid-flow-col grid-cols-[48px_auto_16px] w-full">
                  <div className="relative flex items-center pl-4 col-[1_/_1] row-[1_/_1]">
                    <UserIcon className="size-4" />
                  </div>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="Email"
                    type="email"
                    className="relative outline-0 bg-transparent pl-12 pr-4 h-10 w-full flex items-center rounded-lg border col-span-full row-[1_/_1]"
                  />
                  <div className="flex items-center justify-end pr-2 col-[3_/_4] row-[1_/_1]"></div>
                </div>
                <Button
                  onClick={() => setTab("password")}
                  className="rounded-lg"
                >
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
              </div>
              <footer className="mt-20">
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-muted-foreground">
                      Don't have an ICH account?
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href={"/auth/signup"}
                    className="rounded-xl px-4 py-2 border-2 mt-3 mb-6 border-primary text-primary font-bold "
                  >
                    Sign Up
                  </Link>
                </div>
              </footer>
            </div>
          </TabsContent>
          <TabsContent value="password" asChild>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-grow sm:border sm:rounded-xl sm:py-4 sm:px-12 sm:flex-grow-0 sm:col-start-3 sm:col-end-11 mx-auto w-full sm:max-w-[570px] p-4"
            >
              <h1 className="text-2xl font-semibold tracking-tight text-center mt-4">
                <span>Welcome</span>
              </h1>
              <p className="text-center mt-6 mb-4">{form.email}</p>
              <div className="grid grid-flow-col grid-cols-[48px_auto_16px] w-full ">
                <div
                  className={cn(
                    "relative flex items-center pl-4 col-[1_/_1] row-[1_/_1]",
                    isPending ? "opacity-50" : ""
                  )}
                >
                  <LockIcon className="size-4" />
                </div>
                <input
                  disabled={isPending}
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Password"
                  type="password"
                  className={cn(
                    "relative outline-0 bg-transparent pl-12 pr-4 h-10 w-full flex items-center rounded-lg border col-span-full row-[1_/_1] disabled:opacity-50 disabled:cursor-not-allowed",
                    error ? "border-red-500" : ""
                  )}
                />

                <div className="flex items-center justify-end pr-2 col-[3_/_4] row-[1_/_1]"></div>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-2 font-medium">
                  <CircleAlertIcon className="size-4" />
                  <span>{error}</span>
                </p>
              )}

              <div className="flex justify-between items-center py-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me logged in
                  </label>
                </div>
                <Link
                  href="/auth/recover"
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "hidden sm:block"
                  )}
                >
                  <span>Forgot password?</span>
                </Link>
              </div>

              <Button
                disabled={isPending || !signInSchema.safeParse(form).success}
                className="rounded-lg"
              >
                {isPending ? (
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
                ) : (
                  "Log in"
                )}
              </Button>
              <div className="flex justify-between sm:justify-center items-center py-4">
                <Link
                  href="/auth/recover"
                  className=" text-sm font-medium leading-none text-primary sm:hidden"
                >
                  <span>Forgot password?</span>
                </Link>
                <Button
                  onClick={() => {
                    setForm({
                      email: "",
                      password: "",
                    });
                    setTab("email");
                  }}
                  variant="link"
                >
                  <span>Not you?</span>
                </Button>
              </div>
            </form>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SignInPage;
