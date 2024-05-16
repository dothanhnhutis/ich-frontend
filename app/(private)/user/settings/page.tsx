"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/components/providers/auth-provider";
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

const SettingPage = () => {
  const currentUser = useAuthContext();
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
              Once you delete your account, you will lose access to your
              account. Please be certain.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SettingPage;
