"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderPinwheelIcon } from "react-icons/ai";
import { z } from "zod";
import { changeEmail } from "@/service/api/auth.service";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ChangeEmailForm = ({ currentEmail }: { currentEmail: string }) => {
  const [optenDialog, setOptenDialog] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [isPending, startTransistion] = useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      setError(false);
      if (currentEmail != email) {
        if (await changeEmail({ email })) {
          setEmail("");
          toast.success("Updated and resending e-mail...");
          setOptenDialog(false);
        } else {
          setError(true);
        }
      } else {
        setEmail("");
        setOptenDialog(false);
      }
    });
  };

  return (
    <Dialog open={optenDialog} onOpenChange={setOptenDialog}>
      <Button
        variant="link"
        onClick={() => {
          setOptenDialog(true);
        }}
      >
        <span>Didn't receive email?</span>
      </Button>
      <DialogContent className="sm:max-w-screen-md">
        <div>
          <h4 className="font-medium text-2xl">Didn't receive email?</h4>
          <p className="text-muted-foreground mb-4">
            Here are some tips to help you find it.
          </p>
          <ol className="list-decimal [&>li]:mt-3 my-2 ml-4">
            <li>
              <strong>Resend the email</strong>
            </li>
            <li>
              <strong>Search for the email</strong>
              <p className="text-muted-foreground">
                We'll send the email from "ICH", so you can quickly search for
                it. If it isn't in your inbox, check your folders. If a spam
                filter or email rule moved the email, it might be in Spam, Junk,
                Trash, Deleted Items, or Archive folder.
              </p>
            </li>
            <li>
              <strong>How do I confirm my email?</strong>
              <p className="text-muted-foreground">
                If you aren't able to click the link, copy the full URL from the
                email and paste it into a new web browser window.
              </p>
            </li>
            <li>
              <strong>Change your email</strong>
            </li>
          </ol>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 mt-4"
          >
            <div className="">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                className={cn(
                  "sm:max-w-[300px] focus-visible:ring-offset-0 focus-visible:ring-transparent",
                  error ? "border-destructive" : ""
                )}
              />
              {error && (
                <p className="text-destructive font-light text-sm">
                  You have signed up for this email
                </p>
              )}
            </div>

            <Button
              disabled={
                isPending ||
                !z.string().email("invalid email").safeParse(email).success
              }
              variant="outline"
              className="rounded-full border-2 border-primary !text-primary font-bold"
            >
              {isPending && (
                <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
              )}
              Update and resend
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailForm;
