"use client";
import React, { useState } from "react";
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
import { EditProfileInput, User } from "@/schemas/user";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { editProfile } from "../actions";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditProfileForm = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const [open, setOpen] = useState<boolean>(false);
  const [form, setform] = useState<EditProfileInput>({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async (input: EditProfileInput) => {
      return await editProfile(input);
    },
    onSuccess({ success, message }) {
      if (success) {
        queryClient.invalidateQueries({ queryKey: ["me"] });
        toast.success(message);
      } else {
        toast.error(message);
      }
      setOpen(false);
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    mutate(form);
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                className="focus-visible:ring-0 focus-visible:ring-transparent"
                type="text"
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleOnchange}
              />
              {/* <p className="text-[0.8rem] text-muted-foreground">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                className="focus-visible:ring-0 focus-visible:ring-transparent"
                type="text"
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleOnchange}
              />
              {/* <p className="text-[0.8rem] text-muted-foreground">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p> */}
            </div>
            <div className="col-span-2 space-y-2">
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
            <div className="col-span-2 space-y-2">
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
          </div>
          <DialogFooter className="pt-3">
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
                form.firstName == "" ||
                form.lastName == "" ||
                (currentUser?.firstName == form.firstName &&
                  currentUser?.lastName == form.lastName &&
                  currentUser?.phone == form.phone &&
                  currentUser?.address == form.address)
              }
            >
              {isPending && (
                <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
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
