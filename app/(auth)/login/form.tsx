"use client";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { LoaderPinwheelIcon, OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInInput } from "@/schemas/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ContinueBtn from "../continue-btn";
import PasswordInput from "../../../components/password-input";
import { useMutation } from "@tanstack/react-query";
import { clearEmailRegistered, reActivateAccount, signIn } from "../actions";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const SignInForm = ({
  registered,
  email,
}: {
  registered?: string;
  email?: string;
}) => {
  const [accountSuspended, setAccountSuspended] =
    React.useState<boolean>(false);
  const router = useRouter();
  const [formData, setFormData] = React.useState<SignInInput>({
    email: registered || email || "",
    password: "",
    mfa_code: "",
  });

  const [openMFACode, setOpenMFACode] = React.useState<boolean>(false);

  const [error, setError] = React.useState<{
    success: boolean;
    message: string;
  }>({
    success: true,
    message: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      success: true,
      message: "",
    });
    if (e.target.name == "email") setAccountSuspended(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = (holdEmail?: boolean) => {
    setFormData((prev) => ({
      email: holdEmail ? prev.email : "",
      password: "",
      mfa_code: "",
    }));
    setAccountSuspended(false);
    setError({ success: true, message: "" });
    setOpenMFACode(false);
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: SignInInput) => {
      return await signIn(
        openMFACode ? input : { email: input.email, password: input.password }
      );
    },
    onSuccess({ success, data }) {
      console.log(data);
      if (!success) {
        if (data.message == "Your account is currently closed") {
          handleReset(true);
          setAccountSuspended(true);
        } else if (data.message == "MFA code is required") {
          setOpenMFACode(true);
        } else {
          handleReset();
          setError({ success: false, message: data.message });
        }
      } else {
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") return;
    if (
      !z.string().email().safeParse(formData.email).success ||
      formData.password.length < 8 ||
      formData.password.length > 40
    )
      setError({ success: false, message: "Invalid email or password." });
    mutate(formData);
  };

  const handleReActivate = async () => {
    await reActivateAccount(formData.email);
    handleReset();
  };

  const registeredRef = React.useRef<boolean>(!!registered || false);

  React.useEffect(() => {
    const handleClearEmailRegistered = async () => {
      await clearEmailRegistered();
    };
    handleClearEmailRegistered();
  }, []);

  return (
    <>
      {accountSuspended && (
        <div className="flex items-center gap-3 rounded-lg bg-amber-200 text-orange-500 sm:rounded-xl sm:max-w-md mx-4 sm:mx-auto transition-all mt-4 mb-10 p-4 ">
          <OctagonAlertIcon className="size-6  flex flex-shrink-0" />
          <p className="text-sm ">
            Your account is currently closed. If you would like to reactivate
            your account, click{" "}
            <button onClick={handleReActivate} className="underline">
              here
            </button>
            .
          </p>
        </div>
      )}
      {registeredRef.current && (
        <div className="flex items-center gap-3 rounded-lg bg-amber-200 text-orange-500 sm:rounded-xl sm:max-w-md mx-4 sm:mx-auto transition-all mt-4 mb-10 p-4 ">
          <OctagonAlertIcon className="size-6  flex flex-shrink-0" />
          <p className="text-sm ">
            We've found an existing ICH account with this email address. Please
            continue to login with your account email and password below.
          </p>
        </div>
      )}
      {!openMFACode ? (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg sm:border bg-card text-card-foreground sm:shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
        >
          <img src="data:image/png;base64,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" />
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold tracking-tight text-2xl">Login</h3>
            <p className="text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <div className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="test@example.com"
                  onChange={handleOnchange}
                  value={formData.email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={`/recover${
                      formData.email == "" ? "" : "?email=" + formData.email
                    }`}
                    className="ml-auto inline-block text-sm underline "
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  placeholder="********"
                  autoComplete="off"
                  onChange={handleOnchange}
                  value={formData.password}
                />

                {!error.success && (
                  <p className="text-red-500 text-xs font-bold">
                    {error.message}
                  </p>
                )}
              </div>

              <Button disabled={isPending} variant="default">
                {!openMFACode && isPending && (
                  <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
                )}
                Login
              </Button>
              <ContinueBtn label="Login with Google" redir="/login" />
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg sm:border bg-card text-card-foreground sm:shadow-sm p-4 sm:p-6 sm:mx-auto sm:max-w-md transition-all"
        >
          <div className="flex flex-col space-y-1.5">
            <h3 className="font-semibold tracking-tight text-2xl">
              Multi-factor authentication
            </h3>
            <p className="text-sm text-muted-foreground">
              Your account is secured using multi-factor authentication (MFA).
              To finish signing in, turn on or view your MFA device and type the
              authentication code below.
            </p>
          </div>
          <div className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="mfa_code">MFA code</Label>
                  <Link
                    href={"#"}
                    className="ml-auto inline-block text-sm underline "
                  >
                    Troubleshoot MFA
                  </Link>
                </div>
                <Input
                  id="mfa_code"
                  name="mfa_code"
                  placeholder="MFA code"
                  onChange={handleOnchange}
                  value={formData.mfa_code}
                />
              </div>

              <Button disabled={isPending} variant="default">
                {openMFACode && isPending && (
                  <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
                )}
                Submit
              </Button>
              <Button variant="outline" onClick={() => handleReset()}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
