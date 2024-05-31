"use client";
import React from "react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { diableAuthUser } from "@/service/api/user.service";
import { useRouter } from "next/navigation";

export const DiableBtn = () => {
  const router = useRouter();
  return (
    <AlertDialogAction
      onClick={async () => {
        if (await diableAuthUser()) {
          router.push("/auth/signin");
        }
      }}
    >
      Delete
    </AlertDialogAction>
  );
};
