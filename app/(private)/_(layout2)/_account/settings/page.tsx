"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { disactivateAccount } from "@/app/actions";
import { LoaderPinwheelIcon } from "lucide-react";

const SettingPage = () => {
  const { currentUser } = useAuthContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await disactivateAccount("/account/settings");
    },
    onSettled() {
      setOpen(false);
    },
  });
  return (
    <div className="space-y-2">
      <Label className="text-red-500">Delete Account</Label>
      <p className="text-xs font-light text-muted-foreground">
        Once you delete your account, you will lose access to your account.
        Please be certain.
      </p>

      <AlertDialog
        open={open}
        onOpenChange={(open) => {
          if (!isPending) setOpen(open);
        }}
      >
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={currentUser?.role == "Admin"}>
            Delete your account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will deactivate your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
            >
              {isPending && (
                <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingPage;
