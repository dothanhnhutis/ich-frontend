"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/components/providers/auth-provider";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-b last:border-none py-4">
        <div className="w-full col-span-2 lg:col-span-1">
          <p className="font-bold">Photo</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This will be displayed on your profile.
          </p>
        </div>
        <Avatar className="size-14">
          <AvatarImage
            referrerPolicy="no-referrer"
            src={currentUser?.profile?.picture || AvatarDefault.src}
          />
          <AvatarFallback className="bg-transparent">
            <Skeleton className="size-20 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-end">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-b last:border-none py-4">
        <div className="w-full">
          <p className="font-bold">Personal information</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            This information will be displayed publicly
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 col-span-2 lg:col-span-1 order-2">
          <div className="grid gap-1">
            <Label className="text-sm text-muted-foreground">First name</Label>
            <p className="font-bold text-sm">
              {currentUser?.profile?.firstName}
            </p>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm text-muted-foreground">Last name</Label>
            <p className="font-bold text-sm">
              {currentUser?.profile?.lastName}
            </p>
          </div>
          {currentUser?.profile?.phone && (
            <div className="grid gap-2">
              <Label className="text-sm text-muted-foreground">Phone</Label>
              <p className="font-bold text-sm">{currentUser?.profile?.phone}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end order-1 lg:order-last">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 border-b last:border-none py-4">
        <div className="w-full">
          <p className="font-bold">Personal location</p>
          <p className="text-xs font-normal leading-snug text-muted-foreground">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 col-span-2 lg:col-span-1 order-2">
          <div className="grid gap-1 col-span-2">
            <Label className="text-sm text-muted-foreground">Adress</Label>
            <p className="font-bold text-sm">Nhut</p>
          </div>
          <div className="grid gap-1">
            <Label className="text-sm text-muted-foreground">City/State</Label>
            <p className="font-bold text-sm">Nhut</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm text-muted-foreground">Region</Label>
            <p className="font-bold text-sm">Thanh</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm text-muted-foreground">Post code</Label>
            <p className="font-bold text-sm">96000</p>
          </div>
          <div className="grid gap-2">
            <Label className="text-sm text-muted-foreground">Country</Label>
            <p className="font-bold text-sm">Viet Nam</p>
          </div>
        </div>
        <div className="flex justify-end order-1 lg:order-last">
          <Button className="rounded-full" variant="outline">
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
