"use client";
import { useAuthContext } from "@/components/providers/auth-provider";
import { Switch } from "@/components/ui/switch";
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
import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { MonitorSmartphoneIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const MFASwitch = () => {
  const { currentUser } = useAuthContext();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Switch onClick={() => setOpen(true)} checked={currentUser?.mFAEnabled} />
      <AlertDialogContent className="sm:max-w-screen-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Mutiple-Factor Authentication (MFA)
          </AlertDialogTitle>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="font-normal text-foreground">
                Step 1: Enter device name
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Step 2: Set up device</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AlertDialogHeader>

        <div className="flex flex-col gap-8">
          <div className="grid gap-1">
            <Label htmlFor="device_name">Device name</Label>
            <Input id="device_name" placeholder="MFA device" />
            <p className="text-xs text-muted-foreground">
              Enter a meaningful name to identity this device.
            </p>
            <p className="text-xs text-muted-foreground">
              Maximun 128 characters. Use alphanumberic and '+=,.@-_'
              characters.
            </p>
          </div>

          <div className="flex items-center gap-2 border p-2 rounded">
            <MonitorSmartphoneIcon className="size-16" />
            <div>
              <p className="text-sm font-medium">Authenticator App</p>
              <p className="text-xs text-muted-foreground">
                Authenticator using a code generated by an app installed on your
                mobile device or computer
              </p>
            </div>
          </div>
        </div>

        <div></div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Next</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MFASwitch;
