"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SignUpInput, signUpSchema } from "@/schemas/auth";
import Link from "next/link";
import React, { useCallback, useState, useTransition } from "react";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import authApi from "@/service/collections/auth.collection";
import { signUp } from "../actions";

export const SignUpForm = () => {
  const [form, setForm] = useState<SignUpInput>({
    username: "",
    email: "",
    password: "",
  });
  const [focusingField, setOnFocusAt] = useState<string | undefined>();
  const [didFocusName, setDidFocusName] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [isExistEmail, setisExistEmail] = useState(false);

  const handleValidateError = useCallback(
    (
      keys: (
        | "firstName_empty"
        | "lastName_empty"
        | "invaid_email"
        | "password_too_small"
        | "password_too_big"
        | "password_format_error"
      )[]
    ) => {
      const val = signUpSchema.safeParse(form);
      if (val.success) return false;
      const errors = val.error.issues.map((i) => i.message);
      return keys.filter((val) => errors.includes(val)).length > 0;
    },
    [form]
  );

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    if (e.target.name == "username") setDidFocusName(true);
    if (e.type == "focus") {
      setOnFocusAt(e.target.name);
    }
    if (e.type == "blur") {
      setOnFocusAt(undefined);
    }
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (success != undefined) setSuccess(undefined);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      setisExistEmail(false);
      const { success, message } = await signUp(form);
      if (success) {
        toast.success(message);
        setForm({
          username: "",
          email: "",
          password: "",
        });
      } else {
        setisExistEmail(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          disabled={isPending}
          value={form.username}
          onChange={handleOnchange}
          onFocus={handleOnChangFocus}
          onBlur={handleOnChangFocus}
          name="username"
          type="text"
          id="username"
          className="focus-visible:ring-transparent"
        />
        {focusingField != "username" &&
          didFocusName &&
          handleValidateError(["name_empty"]) && (
            <p className="text-red-500 font-medium text-xs">
              {`Name can't be empty`}
            </p>
          )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={isPending}
          value={form.email}
          onChange={handleOnchange}
          onFocus={handleOnChangFocus}
          onBlur={handleOnChangFocus}
          name="email"
          type="email"
          id="email"
          className="focus-visible:ring-transparent"
        />
        {focusingField != "email" &&
          handleValidateError(["invaid_email"]) &&
          form.email.length > 0 && (
            <p className="text-red-500 font-medium text-xs">
              Enter a valid email address
            </p>
          )}
        {isExistEmail && (
          <p className="font-medium text-xs text-red-500">
            This email is already in use.{" "}
            <Link className="text-primary text-xs" href="/auth/signin">
              Sign in
            </Link>
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          disabled={isPending}
          value={form.password}
          onChange={handleOnchange}
          onFocus={handleOnChangFocus}
          onBlur={handleOnChangFocus}
          name="password"
          id="password"
          className="focus-visible:ring-transparent"
          type="password"
          autoComplete="off"
        />
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
              handleValidateError(["password_too_small", "password_too_big"])
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

      <Button
        disabled={isPending || !signUpSchema.safeParse(form).success}
        variant="default"
        type="submit"
      >
        {isPending ? (
          <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
        ) : (
          "Create my account"
        )}
      </Button>
    </form>
  );
};
