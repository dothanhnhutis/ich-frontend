"use client";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { Switch } from "@/components/ui/switch";
import { EditUserInput, User } from "@/schemas/user";
import { editUserById } from "../../actions";
import { toast } from "sonner";

export const EditUserForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [form, setForm] = React.useState<EditUserInput>({
    role: user.role,
    address: user.address || "",
    suspended: user.suspended,
    disabled: user.disabled,
    phone: user.phone || "",
    username: user.username,
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
      const res = await editUserById(user.id, form);
      if (res.success) {
        toast.success(res.message);
        router.push("/manager/users");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-4 overflow-y-scroll bg-background p-4 rounded-md"
    >
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">ID</Label>
        <Input
          disabled
          value={user.id}
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Email</Label>
        <Input
          disabled
          value={user.email}
          type="text"
          className="focus-visible:ring-transparent"
        />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Name</Label>
        <Input
          value={form.username}
          onChange={handleOnchange}
          type="text"
          name="username"
          className="focus-visible:ring-transparent"
        />
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Label className="leading-snug text-muted-foreground">Role</Label>
        <Select
          disabled={isPending}
          onValueChange={(v) =>
            setForm((prev) => ({ ...prev, role: v as EditUserInput["role"] }))
          }
          defaultValue={form.role}
        >
          <SelectTrigger className="focus-visible:ring-transparent">
            <SelectValue placeholder="Select a role to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MANAGER">MANAGER</SelectItem>
            <SelectItem value="BLOGER">WRITTER</SelectItem>
            <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
          </SelectContent>
        </Select>
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
      <div className="col-span-2 lg:col-span-1">
        <Label htmlFor="status" className="leading-snug text-muted-foreground">
          Suspend
        </Label>
        <div className="flex items-center justify-between">
          <p className="text-xs font-light text-muted-foreground">
            Do you want this account to be suspend?
          </p>
          <Switch
            disabled={isPending}
            id="status"
            name="suspend"
            checked={form.suspended}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, suspended: checked }))
            }
          />
        </div>
      </div>

      <div className="col-span-2 lg:col-span-1">
        <Label htmlFor="status" className="leading-snug text-muted-foreground">
          Disable
        </Label>
        <div className="flex items-center justify-between">
          <p className="text-xs font-light text-muted-foreground">
            Do you want this account to be disable?
          </p>
          <Switch
            disabled={isPending}
            id="status"
            name="disabled"
            checked={form.disabled}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, disabled: checked }))
            }
          />
        </div>
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
