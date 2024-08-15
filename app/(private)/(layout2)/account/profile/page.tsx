"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

import { UploadPhoto } from "./upload-photo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import EditProfileForm from "./edit-profile-form";
import { useAuthContext } from "@/components/providers/auth-provider";

const ProfilePage = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <h3 className="text-lg font-medium">Profile</h3>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
      <Separator className="my-4" />
      <div className="lg:flex lg:justify-center lg:items-start space-y-4 lg:space-y-0">
        <div className="order-last lg:w-1/4 lg:flex lg:justify-center">
          <UploadPhoto>
            <Avatar className="size-40 cursor-pointer">
              <AvatarImage src={currentUser?.picture || AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="size-40 rounded-full" />
              </AvatarFallback>
            </Avatar>
          </UploadPhoto>
        </div>
        <div className="relative w-full space-y-4">
          <div>
            <Label>Username</Label>
            <p>{currentUser?.username}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p>{currentUser?.email}</p>
          </div>
          {currentUser?.phone && (
            <div>
              <Label>Phone</Label>
              <p>{currentUser.phone}</p>
            </div>
          )}
          {currentUser?.address && (
            <div>
              <Label>Address</Label>
              <p>{currentUser.address}</p>
            </div>
          )}
          <EditProfileForm />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
