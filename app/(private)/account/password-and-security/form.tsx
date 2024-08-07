"use client";
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { LockIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { EditPasswordInput, editPasswordSchema } from "@/schemas/user";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createPassword, editPassword } from "../actions";
import { recover } from "@/app/actions";
import { omit } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/components/providers/auth-provider";

export const PasswordForm = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(true);
  const [focusingField, setOnFocusAt] = useState<string | undefined>();

  const [form, setForm] = useState<EditPasswordInput>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
      const val = editPasswordSchema.safeParse(form);
      if (val.success) return false;
      const errors = val.error.issues.map((i) => i.message);
      return keys.filter((val) => errors.includes(val)).length > 0;
    },
    [form]
  );

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: EditPasswordInput) => {
      return currentUser?.hasPassword
        ? await editPassword(input)
        : await createPassword(omit(input, ["oldPassword"]));
    },
    onSettled() {
      setIsError(false);
    },
    onSuccess({ success, message }) {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success(message);
        setOpenDialog(false);
      } else {
        toast.error(message);
        setIsError(true);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };

  useEffect(() => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsError(false);
    setIsHiddenPassword(true);
  }, [openDialog]);

  const { isPending: isSending, mutate: send } = useMutation({
    mutationFn: async (email: string) => {
      return await recover(email);
    },
    onSuccess({ success, message }) {
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
  });

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!isSending) setOpenDialog(open);
      }}
    >
      <Button
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <LockIcon className="size-4 mr-2" />
        {currentUser?.hasPassword ? "Change password" : "Create password"}
      </Button>

      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>
            {currentUser?.hasPassword ? "Update password" : "Create password"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {currentUser?.hasPassword && (
            <div className="space-y-2">
              <Label htmlFor="old-password">Current password</Label>
              <div
                className={cn(
                  "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  isPending && "cursor-not-allowed opacity-50"
                )}
              >
                <input
                  value={form.oldPassword}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                  onFocus={handleOnChangFocus}
                  onBlur={handleOnChangFocus}
                  disabled={isPending}
                  type={isHiddenPassword ? "password" : "text"}
                  className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  id="old-password"
                  name="old-password"
                  autoComplete="off"
                  spellCheck="false"
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
              {isError && (
                <p className="text-red-500 font-medium text-xs">
                  Current password is incorrect.{" "}
                  <button
                    disabled={isSending}
                    type="button"
                    onClick={() => {
                      send(currentUser.email);
                    }}
                    className="text-primary disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                  {isSending && (
                    <AiOutlineLoading3Quarters className="text-primary inline size-4 animate-spin flex-shrink-0 ml-1" />
                  )}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <div
              className={cn(
                "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                isPending && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                value={form.newPassword}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                onFocus={handleOnChangFocus}
                onBlur={handleOnChangFocus}
                disabled={isPending}
                type={isHiddenPassword ? "password" : "text"}
                className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                id="new-password"
                name="new-password"
                autoComplete="off"
                spellCheck="false"
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
            <div className="flex flex-col gap-y-1">
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
          <div className="space-y-2">
            <Label>Confirm password</Label>
            <div
              className={cn(
                "flex gap-x-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                isPending && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                value={form.confirmNewPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmNewPassword: e.target.value,
                  }))
                }
                onFocus={handleOnChangFocus}
                onBlur={handleOnChangFocus}
                disabled={isPending}
                type={isHiddenPassword ? "password" : "text"}
                className="flex-grow outline-none bg-transparent placeholder:align-middle placeholder:justify-center placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed disabled:opacity-50"
                id="confirm-password"
                name="confirm-password"
                autoComplete="off"
                spellCheck="false"
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
            {!focusingField &&
              handleValidateError(["password_do_not_match"]) && (
                <p className="text-red-500 font-medium text-xs">
                  {`Confirm password don't match`}
                </p>
              )}
          </div>
          <div className="flex gap-4 flex-col sm:flex-row justify-end">
            <Button
              disabled={
                isSending ||
                isPending ||
                (currentUser?.hasPassword && form.oldPassword.length == 0) ||
                form.newPassword.length == 0 ||
                form.confirmNewPassword.length == 0 ||
                (!focusingField &&
                  currentUser?.hasPassword &&
                  !editPasswordSchema.safeParse(form).success)
              }
              className="sm:order-last"
            >
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0 mr-2 " />
              )}
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpenDialog(false);
              }}
              disabled={isPending}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
