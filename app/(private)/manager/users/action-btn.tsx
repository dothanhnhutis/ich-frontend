"use client";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type ActionBtn =
  | {
      as: "link";
      href: string;
      labelAction: string;
      className?: string;
    }
  | {
      as: "modal";
      labelAction: string;
      className?: string;
      modalTitle: string;
      modalSubtitle: string;
      destructive?: boolean;
      onSubmit?: () => void;
    };

const ActionBtn = (data: ActionBtn) => {
  if (data.as == "link") {
    return (
      <Button
        asChild
        size="sm"
        className={cn("text-xs p-1 h-auto text-white", data.className)}
      >
        <Link href={data.href}>{data.labelAction}</Link>
      </Button>
    );
  } else {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className={cn("text-xs p-1 h-auto", data.className)}
          >
            {data.labelAction}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{data.modalTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {data.modalSubtitle}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              variant={data.destructive ? "destructive" : "default"}
              onClick={data.onSubmit}
            >
              {data.labelAction}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default ActionBtn;
