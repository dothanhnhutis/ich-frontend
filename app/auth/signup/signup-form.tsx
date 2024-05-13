"use client";
import { z } from "zod";
import React, { useCallback, useEffect, useState, useTransition } from "react";

import { CardWrapper } from "../card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signupSchema } from "@/schemas/auth";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import SendMailButtom from "./send-mail-button";
import { signup } from "@/actions/auth";
import FormError from "../form-error";
import FormSuccess from "../form-success";

const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [focusingField, setOnFocusAt] = useState<string | undefined>();
  const [didFocusName, setDidFocusName] = useState<boolean>(false);
  const [isPending, startTransistion] = useTransition();

  const [form, setForm] = useState<z.infer<typeof signupSchema>>({
    name: "",
    email: "",
    password: "",
    code: "",
  });

  const [isExistEmail, setisExistEmail] = useState(false);

  useEffect(() => {
    setisExistEmail(false);
  }, [form.email]);

  useEffect(() => {
    setError(undefined);
  }, [form.code]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(() => {
      // signup(form)
      //   .then((data) => {
      //     setError(data.error);
      //     setSuccess(data.success);
      //     if (data.success) {
      //       setForm({
      //         name: "",
      //         email: "",
      //         password: "",
      //         code: "",
      //       });
      //       setDidFocusName(false);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    });
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (success != undefined) setSuccess(undefined);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.target.name == "name") setDidFocusName(true);
    if (e.type == "focus") {
      setOnFocusAt(e.target.name);
    }
    if (e.type == "blur") {
      setOnFocusAt(undefined);
    }
  };

  const handleValidateError = useCallback(
    (
      keys: (
        | "name_empty"
        | "invaid_email"
        | "password_too_small"
        | "password_too_big"
        | "password_format_error"
        | "code_error"
      )[]
    ) => {
      const val = signupSchema.safeParse(form);
      if (val.success) return false;
      const errors = val.error.issues.map((i) => i.message);
      return keys.filter((val) => errors.includes(val)).length > 0;
    },
    [form]
  );

  return (
    <CardWrapper
      headerLaybel="Create an account"
      headerDescription="Fill out all fields below to create an account"
      backButtonHref="/auth/signin"
      backButtonLaybel="Already have an Account?"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled={isPending}
              value={form.name}
              onChange={handleOnchange}
              className="focus-visible:ring-transparent"
              onFocus={handleOnChangFocus}
              onBlur={handleOnChangFocus}
              id="name"
              name="name"
              placeholder="Finn"
            />
            {focusingField != "name" &&
              didFocusName &&
              handleValidateError(["name_empty"]) && (
                <p className="text-red-500 font-medium text-xs">
                  {`Name can't be empty`}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isPending}
              value={form.email}
              onChange={handleOnchange}
              className="focus-visible:ring-transparent"
              onFocus={handleOnChangFocus}
              onBlur={handleOnChangFocus}
              id="email"
              name="email"
              placeholder="example@gmail.com"
            />
            {focusingField != "email" &&
              handleValidateError(["invaid_email"]) &&
              form.email.length > 0 && (
                <p className="text-red-500 font-medium text-xs">
                  Enter a valid email address
                </p>
              )}

            {isExistEmail && (
              <p className="font-medium text-xs">
                You have registered,
                <Link className="text-primary text-xs" href="/auth/signin">
                  Sign in
                </Link>
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div
              className={cn(
                "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background",
                isPending && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                disabled={isPending}
                onFocus={handleOnChangFocus}
                onBlur={handleOnChangFocus}
                value={form.password}
                onChange={handleOnchange}
                type={isHiddenPassword ? "password" : "text"}
                className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                name="password"
                autoComplete="off"
                placeholder="********"
              />
              <button
                className="disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending}
                type="button"
                tabIndex={-1}
                onClick={() => setIsHiddenPassword((prev) => !prev)}
              >
                {isHiddenPassword ? (
                  <PiEyeClosedBold size={20} />
                ) : (
                  <PiEyeBold size={20} />
                )}
              </button>
            </div>
            <div
              className={cn(
                focusingField == "password" || form.password.length > 0
                  ? "flex flex-col gap-y-1"
                  : "hidden"
              )}
            >
              <p className="font-normal text-xs">Your password must include:</p>
              <p
                className={cn(
                  "inline-flex gap-x-2 items-center text-gray-500",
                  handleValidateError([
                    "password_too_small",
                    "password_too_big",
                  ])
                    ? ""
                    : "text-green-400"
                )}
              >
                <AiOutlineCheck size={16} />
                <span className="font-medium text-xs">8 to 40 characters</span>
              </p>
              <p
                className={cn(
                  "inline-flex gap-x-2 items-center text-gray-500",
                  handleValidateError(["password_format_error"])
                    ? ""
                    : "text-green-400"
                )}
              >
                <AiOutlineCheck size={16} />
                <span className="font-medium text-xs">
                  Letters, numbers and special characters
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Label htmlFor="code">Code</Label>
            <div
              className={cn(
                "h-10 border rounded-md overflow-hidden flex items-center mt-1.5",
                isPending && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                disabled={isPending}
                value={form.code}
                onChange={handleOnchange}
                onFocus={handleOnChangFocus}
                onBlur={handleOnChangFocus}
                className="flex-grow pl-3 py-1 h-full outline-none bg-transparent text-sm placeholder:text-muted-foreground"
                type="text"
                name="code"
                id="code"
                placeholder="123456"
                maxLength={6}
              />
              <SendMailButtom
                email={form.email}
                setisExistEmail={setisExistEmail}
              />
            </div>
            {focusingField !== "code" &&
              form.code.length > 0 &&
              handleValidateError(["code_error"]) && (
                <p className="text-red-500 font-medium text-xs">
                  Enter the 6-digit code
                </p>
              )}

            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
          <Button
            disabled={isPending || !signupSchema.safeParse(form).success}
            variant="default"
            type="submit"
          >
            {isPending ? (
              <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default SignUpForm;
