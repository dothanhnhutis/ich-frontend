"use client";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import { CardWrapper } from "../card-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SignUpForm, signupSchema } from "@/schemas/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const SignUpPage = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [focusingField, setOnFocusAt] = useState<string | undefined>();
  const [didFocusName, setDidFocusName] = useState<boolean>(false);
  const [isPending, startTransistion] = useTransition();

  const [form, setForm] = useState<SignUpForm>({
    username: "",
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

  const [tab, setTab] = useState<string>("back");
  return (
    <CardWrapper
      showSocial={tab == "back"}
      headerLaybel="Create an account"
      headerDescription="Fill out all fields below to create an account"
      backButtonHref="/auth/signin"
      backButtonLaybel="Already have an Account?"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <Tabs onValueChange={setTab} value={tab} defaultValue={tab}>
          <div
            className={cn(
              "grid w-full",
              tab == "back" ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            <Button
              onClick={() => setTab("back")}
              value="back"
              className={cn(tab == "back" ? "hidden" : "")}
            >
              Back
            </Button>
            <Button onClick={() => setTab("next")} value="next">
              {tab == "back" ? "Next" : "Submit"}
            </Button>
          </div>
          <TabsContent value="back">
            <div>1</div>
          </TabsContent>
          <TabsContent value="next">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </TabsContent>
        </Tabs>
      </form>
    </CardWrapper>
  );
};

export default SignUpPage;
