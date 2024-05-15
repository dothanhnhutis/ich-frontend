import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  return (
    <>
      <h3 className="text-lg font-medium">Profile</h3>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
      <Separator className="my-4" />
      <div className="lg:flex lg:justify-center lg:items-start space-y-4 lg:space-y-0">
        <div className="order-last lg:w-1/4 lg:flex lg:justify-center">
          <Dialog>
            <DialogTrigger>
              <Avatar className="size-40 cursor-pointer">
                <AvatarImage src={AvatarDefault.src} />
                <AvatarFallback className="bg-transparent">
                  <Skeleton className="size-40 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Edit photo</DialogTitle>
                <DialogDescription>
                  Must be an actual photo of you. Logos, clip-art, group photos,
                  and digitally-altered images are not allowed.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative w-full space-y-4">
          <div>
            <Label>User ID</Label>
            <p>asdasd</p>
          </div>
          <div>
            <Label>Username</Label>
            <p>asdasd</p>
          </div>
          <div>
            <Label>Email</Label>
            <p>asdasd</p>
          </div>
          <div>
            <Label>Phone</Label>
            <p>asdasd</p>
          </div>
          <div>
            <Label>Address</Label>
            <p>asdasd</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="absolute top-0 right-0 hover:bg-accent p-2 rounded-full cursor-pointer ">
                <PencilIcon className="size-5" />
              </div>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
                <DialogDescription>
                  This is how others will see you on the site.
                </DialogDescription>
              </DialogHeader>
              <form action="" className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input type="text" id="username" />
                  <p className="text-[0.8rem] text-muted-foreground">
                    This is your public display name. It can be your real name
                    or a pseudonym. You can only change this once every 30 days.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Phone</Label>
                  <Input type="text" id="username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Address</Label>
                  <Input type="text" id="username" />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
