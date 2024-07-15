"use client";
import React, { useState, useTransition } from "react";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/schemas/user";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { editProfile } from "@/service/api/user.service";
import { toast } from "sonner";

const EditProfileForm = ({ currentUser }: { currentUser?: User }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [form, setform] = useState<
    Required<Pick<User, "username" | "phone" | "address">>
  >({
    username: currentUser?.username || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      console.log(form);
      const res = await editProfile(form);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-transparent"
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleOnchange}
            />
            {/* <p className="text-[0.8rem] text-muted-foreground">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p> */}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-transparent"
              type="text"
              id="phone"
              name="phone"
              value={form.phone || ""}
              onChange={handleOnchange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-transparent"
              type="text"
              id="address"
              name="address"
              value={form.address || ""}
              onChange={handleOnchange}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isPending ||
                (currentUser?.username == form.username &&
                  currentUser?.phone == form.phone &&
                  currentUser?.address == form.address)
              }
            >
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileForm;
