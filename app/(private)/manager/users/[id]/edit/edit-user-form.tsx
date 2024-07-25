"use client";
import React, { useTransition } from "react";
import { notFound, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { EditUserType, Role, User } from "@/schemas/user";
import { isEqual } from "lodash";
// import { editUserById } from "@/service/api/user";

export const EditUserForm = ({
  user,
}: {
  user: User & { role: Omit<User["role"], "ADMIN"> };
}) => {
  const router = useRouter();
  const [form, setForm] = React.useState<EditUserType>({
    // role: user.role,
  });

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const [isPending, startTransistion] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      // const res = await editUserById(id, form);
      // if (res.statusCode == 200) {
      //   toast.success(res.message);
      //   router.push("/manager/users");
      // } else {
      //   toast.error(res.message);
      // }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-y-scroll bg-background p-4 rounded-md"
    >
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Email</Label>
        <Input
          type="text"
          name="username"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Name</Label>
        <Input
          type="text"
          name="name"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Phone</Label>
        <Input
          disabled={isPending}
          value={form.phone ?? ""}
          onChange={handleOnchange}
          name="phone"
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Role</Label>
        <Select
          disabled={isPending}
          onValueChange={(v) =>
            setForm((prev) => ({ ...prev, role: v as EditUserType["role"] }))
          }
          defaultValue={form.role}
        >
          <SelectTrigger className="focus-visible:ring-transparent">
            <SelectValue placeholder="Select a role to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MANAGER">MANAGER</SelectItem>
            <SelectItem value="WRITER">WRITTER</SelectItem>
            <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2  flex items-center justify-between">
        <div>
          <Label htmlFor="status">Status</Label>
          <p className="text-xs font-light text-muted-foreground">
            Do you want this account to be activated?
          </p>
        </div>

        <Switch
          disabled={isPending}
          id="status"
          checked={form.inActive}
          onCheckedChange={(checked) =>
            setForm((prev) => ({ ...prev, isActive: checked }))
          }
        />
      </div>
      <div className="col-span-2 ">
        <Label className="leading-snug text-muted-foreground">Address</Label>
        <Input
          disabled={isPending}
          value={form.address ?? ""}
          onChange={handleOnchange}
          name="address"
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2">
        <Label className="leading-snug text-muted-foreground">Bio</Label>
        <Textarea
          disabled={isPending}
          onChange={handleOnchange}
          name="bio"
          maxLength={255}
          className="focus-visible:ring-transparent"
          placeholder="Tell us a little bit about yourself"
          value={form.bio ?? ""}
        />
      </div>
      <div className="col-span-2">
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button type="submit" size="lg">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
