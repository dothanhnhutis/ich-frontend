"use client";
import { SignInData, signInSchema } from "@/schemas/auth";
import React, { useEffect, useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { cn } from "@/lib/utils";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import FormError from "../form-error";
import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "@/service/api/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const [form, setForm] = useState<SignInData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError(undefined);
  }, [form]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await signIn(form);
      if (res.success) {
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <CardWrapper
      showSocial={true}
      backButtonHref="/auth/signup"
      backButtonLaybel="Don't have an account?"
      headerLaybel="Sign In"
      headerDescription="Enter your email below to login to your account"
    >
      <form className="flex flex-col gap-y-4 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={isPending}
            className="focus-visible:ring-transparent"
            value={form.email}
            onChange={handleOnchange}
            id="email"
            name="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/recover" className="underline text-sm">
              Forgot your password?
            </Link>
          </div>

          <div
            className={cn(
              "flex h-10 px-3 py-1 border rounded-md overflow-hidden gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              disabled={isPending}
              value={form.password}
              onChange={handleOnchange}
              type={isHiddenPassword ? "password" : "text"}
              className="flex-grow outline-none bg-transparent text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="********"
            />
            <button
              disabled={isPending}
              type="button"
              className="disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsHiddenPassword((prev) => !prev)}
            >
              {isHiddenPassword ? (
                <PiEyeClosedBold size={20} />
              ) : (
                <PiEyeBold size={20} />
              )}
            </button>
          </div>
        </div>
        <FormError message={error} />
        <Button
          disabled={isPending || !signInSchema.safeParse(form).success}
          variant="default"
          type="submit"
        >
          {isPending ? (
            <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </CardWrapper>
  );
};

export default SigninPage;
