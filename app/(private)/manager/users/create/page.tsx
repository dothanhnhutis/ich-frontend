"use client";
import React, { useTransition } from "react";
import z from "zod";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { CreateUserInput, roles } from "@/schemas/user";
import { createUser } from "../actions";

const CreateUserPage = () => {
  const router = useRouter();
  const [isHiddenPassword, setIsHiddenPassword] = React.useState<boolean>(true);
  const [form, setForm] = React.useState<CreateUserInput>({
    email: "",
    password: "",
    disabled: true,
    role: "CUSTOMER",
    username: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [isPending, startTransistion] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransistion(async () => {
      const res = await createUser(form);
      if (res.success) {
        toast.success(res.message);
        router.push("/manager/users");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <>
      <Link
        href="/manager/users"
        className="gap-1 hover:bg-secondary inline-flex py-1 px-2 items-center justify-center rounded"
      >
        <ChevronLeftIcon className="size-4" />
        <p className="text-xs font-light">Back</p>
      </Link>
      <h2 className="lg:text-3xl font-bold text-2xl mb-3">Create New User</h2>
      <form onSubmit={handleSubmit} className="bg-card border p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 md:grid-flow-col gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isPending}
              onChange={handleOnChange}
              value={form.email}
              id="email"
              name="email"
              type="email"
              className="focus-visible:ring-transparent"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="flex h-10 w-full rounded-md border border-input bg-background overflow-hidden text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <input
                disabled={isPending}
                onChange={handleOnChange}
                value={form.password}
                type={isHiddenPassword ? "password" : "text"}
                className="flex-grow outline-none bg-transparent placeholder:text-muted-foreground px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
              />
              <button
                className="flex flex-shrink-0 items-center px-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                tabIndex={-1}
                onClick={() => setIsHiddenPassword((prev) => !prev)}
              >
                {isHiddenPassword ? (
                  <PiEyeClosedBold size={20} />
                ) : (
                  <PiEyeBold size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-medium text-sm">Your password must include:</p>
            <p
              className={cn(
                "inline-flex space-x-2 items-center text-gray-500",
                !z.string().min(8).max(40).safeParse(form.password).success
                  ? ""
                  : "text-green-400"
              )}
            >
              <AiOutlineCheck size={16} />
              <span className="font-medium text-xs">8 to 40 characters</span>
            </p>
            <p
              className={cn(
                "inline-flex space-x-2 items-center text-gray-500",
                !z
                  .string()
                  .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
                  )
                  .safeParse(form.password).success
                  ? ""
                  : "text-green-400"
              )}
            >
              <AiOutlineCheck size={16} />
              <span className="font-medium text-xs">
                Letters, numbers and special characters
              </span>
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Name</Label>
            <Input
              disabled={isPending}
              onChange={handleOnChange}
              value={form.username}
              id="username"
              name="username"
              className="focus-visible:ring-transparent "
              placeholder="User name"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Role</Label>
            <Select
              disabled={isPending}
              onValueChange={(v) =>
                setForm((prev) => ({
                  ...prev,
                  role: v as CreateUserInput["role"],
                }))
              }
              defaultValue={form.role}
            >
              <SelectTrigger className="focus-visible:ring-transparent">
                <SelectValue placeholder="Select a role to display" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role, idx) => (
                  <SelectItem key={idx} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex  justify-between space-y-1.5">
            <div>
              <Label htmlFor="status">Active</Label>
              <p className="text-xs font-light text-muted-foreground mt-1">
                Do you want the account to be active immediately after creation?
              </p>
            </div>

            <Switch
              disabled={isPending}
              id="status"
              checked={form.disabled}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, disabled: checked }))
              }
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={
              isPending ||
              form.email.length == 0 ||
              form.username.length == 0 ||
              !z
                .string()
                .min(8)
                .max(40)
                .regex(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/
                )
                .safeParse(form.password).success
            }
          >
            {isPending ? (
              <Loader2 className=" h-4 w-4 mx-3.5 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateUserPage;
