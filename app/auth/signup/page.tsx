"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SignUpData,
  signupSchema,
  signupWithoutCodeSchema,
} from "@/schemas/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import FormError from "../form-error";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useCountDown from "@/hook/useCountDown";
import { omit } from "lodash";
import { senOTP, signUp } from "@/service/api/auth.service";
import { toast } from "sonner";

const SignUpPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [focusingField, setOnFocusAt] = useState<string | undefined>();
  const [didFocusName, setDidFocusName] = useState<boolean>(false);
  const [isPendingSendEmail, startTransistionSendEmail] = useTransition();
  const [isPending, startTransistion] = useTransition();
  const [tab, setTab] = useState<string>("tab1");

  const [form, setForm] = useState<SignUpData>({
    username: "",
    email: "",
    password: "",
    code: "",
  });
  const [count, setCount] = useCountDown("email-otp", form.email);

  const [isExistEmail, setisExistEmail] = useState(false);

  useEffect(() => {
    setisExistEmail(false);
  }, [form.email]);

  useEffect(() => {
    setError(undefined);
  }, [form.code]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      setError(undefined);
      const res = await signUp(form);
      if (res.statusCode == 201) {
        setDidFocusName(false);
        setForm({
          username: "",
          email: "",
          password: "",
          code: "",
        });
        toast.success(res.message);
        setTab("tab1");
      } else {
        setError(res.message);
      }
    });
  };

  useEffect(() => {
    setForm((prev) => ({ ...prev, code: "" }));
  }, [tab]);

  const handleSendOTP = () => {
    startTransistionSendEmail(async () => {
      const data = await senOTP(form.email);
      if (data.statusCode == 200) {
        setCount();
        setTab("tab2");
      } else {
        setisExistEmail(true);
      }
    });
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (success != undefined) setSuccess(undefined);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleValidateError = useCallback(
    (
      keys: (
        | "username_empty"
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
      showSocial={tab == "tab1"}
      headerLaybel="Create an account"
      headerDescription={
        tab == "tab1"
          ? "Fill out all fields below to create an account"
          : "Enter a 6-digit code from your email"
      }
      backButtonHref={tab == "tab1" ? "/auth/signin" : ""}
      backButtonLaybel="Already have an Account?"
    >
      <Tabs
        className="w-full"
        onValueChange={setTab}
        value={tab}
        defaultValue={tab}
      >
        <TabsContent value="tab1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendOTP();
            }}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                disabled={isPending}
                value={form.username}
                onChange={handleOnchange}
                className="focus-visible:ring-transparent"
                onFocus={handleOnChangFocus}
                onBlur={handleOnChangFocus}
                id="username"
                name="username"
                placeholder="Finn"
              />
              {focusingField != "username" &&
                didFocusName &&
                handleValidateError(["username_empty"]) && (
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
                <p className="font-normal text-xs">
                  Your password must include:
                </p>
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
                  <span className="font-medium text-xs">
                    8 to 40 characters
                  </span>
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
              disabled={
                isPendingSendEmail ||
                !signupWithoutCodeSchema.safeParse(omit(form, ["code"]))
                  .success ||
                count > 0
              }
            >
              {isPendingSendEmail ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              ) : count > 0 ? (
                `${count}s`
              ) : (
                "Next"
              )}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="tab2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4"
          >
            <InputOTP
              value={form.code}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, code: value }))
              }
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              Did not receive otp code?{" "}
              {isPendingSendEmail ? (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin inline" />
              ) : count > 0 ? (
                <span>{count}s</span>
              ) : (
                <span
                  onClick={handleSendOTP}
                  className="underline cursor-pointer"
                >
                  Send
                </span>
              )}
            </p>
            <FormError message={error} />
            <div className="flex w-full gap-4">
              <Button
                disabled={isPending}
                className="w-full"
                type="button"
                onClick={() => setTab("tab1")}
              >
                Back
              </Button>
              <Button
                disabled={isPending || !signupSchema.safeParse(form).success}
                className="w-full"
                type="submit"
              >
                {isPending ? (
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </CardWrapper>
  );
};

export default SignUpPage;
