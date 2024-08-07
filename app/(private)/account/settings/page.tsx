import React from "react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/app/actions";
import DisableAccountBtn from "./disable-btn";

const SettingPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-2">
      <Label className="text-red-500">Delete Account</Label>
      <p className="text-xs font-light text-muted-foreground">
        Once you delete your account, you will lose access to your account.
        Please be certain.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={currentUser?.role == "ADMIN"}>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <DisableAccountBtn />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingPage;
