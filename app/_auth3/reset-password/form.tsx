"use client";
import React, { useCallback, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AiOutlineCheck, LoaderPinwheelIcon } from "react-icons/ai";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { ResetPasswordInput, resetPasswordSchema } from "@/schemas/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resetPassword } from "../actions";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [isPending, startTransistion] = useTransition();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [focusingField, setOnFocusAt] = useState<string | undefined>();

  const [form, setForm] = useState<ResetPasswordInput>({
    password: "",
    confirmPassword: "",
  });

  const handleOnChangFocus = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
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
        | "password_too_small"
        | "password_too_big"
        | "password_format_error"
        | "password_do_not_match"
      )[]
    ) => {
      const val = resetPasswordSchema.safeParse(form);
      if (val.success) return false;
      const errors = val.error.issues.map((i) => i.message);
      return keys.filter((val) => errors.includes(val)).length > 0;
    },
    [form]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await resetPassword(token, form);
      if (res.success) {
        setForm({ password: "", confirmPassword: "" });
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
      <div className="flex flex-col gap-y-1.5">
        <Label htmlFor="new-password">New password</Label>
        <div
          className={cn(
            "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background",
            isPending && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            onFocus={handleOnChangFocus}
            onBlur={handleOnChangFocus}
            disabled={isPending}
            type={isHiddenPassword ? "password" : "text"}
            className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
            id="new-password"
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
      <div className="flex flex-col gap-y-1.5">
        <Label htmlFor="confirm-password">Confirm password</Label>
        <div
          className={cn(
            "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background",
            isPending && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            onFocus={handleOnChangFocus}
            onBlur={handleOnChangFocus}
            disabled={isPending}
            type={isHiddenPassword ? "password" : "text"}
            className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
            id="confirm-password"
            name="confirmPassword"
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
        {!focusingField && handleValidateError(["password_do_not_match"]) && (
          <p className="text-red-500 font-medium text-xs">
            {`Confirm password don't match`}
          </p>
        )}
      </div>
      <Button
        disabled={
          isPending ||
          form.password.length == 0 ||
          form.confirmPassword.length == 0 ||
          (!focusingField && !resetPasswordSchema.safeParse(form).success)
        }
      >
        {isPending ? (
          <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0" />
        ) : (
          "Reset"
        )}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
