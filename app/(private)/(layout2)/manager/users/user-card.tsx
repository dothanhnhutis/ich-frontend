import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import CardEmpty from "@/assets/svgs/card-empty";
import { SearchUserRes } from "@/schemas/user";
import ActionBtn from "./action-btn";
import { editUserById } from "./actions";
import { toast } from "sonner";

export const UserCardView = ({ data = [] }: { data?: SearchUserRes[] }) => {
  if (!data || data.length == 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <CardEmpty />
      </div>
    );

  const handleAction = async (
    id: string,
    type: "suspend" | "reactivate" | "disable" | "enable"
  ) => {
    const { success, message } = await editUserById(
      id,
      type == "suspend"
        ? {
            suspended: true,
          }
        : type == "reactivate"
        ? { suspended: false }
        : { disabled: type == "disable" }
    );
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.map((user) => (
        <div
          key={user.email}
          className="rounded-lg bg-card text-card-foreground border w-full"
        >
          <div className="flex items-center justify-between py-3 px-4 border-b text-sm font-medium">
            <p>ID user: {user.id}</p>
            <div className="flex items-center gap-2">
              <Link href="/" className="text-primary font-bold">
                Chat
              </Link>
              <Separator orientation="vertical" />
              <p>{format(new Date(user.createdAt), "dd/MM/yyyy kk:mm:ss")}</p>
            </div>
          </div>

          <div className="flex  gap-2 p-4">
            <div className="grid grid-cols-[52px_1fr_1fr] w-full">
              <Avatar>
                <AvatarImage
                  src={user.picture || "https://github.com/shadcn.png"}
                  alt="avatar"
                />
                <AvatarFallback>ICH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-base font-semibold">{user.username}</p>
                <p>{user.email}</p>
                <div className="flex gap-2 items-center">
                  {user.hasPassword && <Badge>Password</Badge>}
                  {user.linkProviders.map((l) => (
                    <Badge key={l.provider} className="capitalize">
                      {l.provider}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="font-semibold">{user.role}</div>
            </div>
            <div className="flex flex-col gap-2 w-32">
              {!user.suspended && !user.disabled && (
                <ActionBtn
                  as="link"
                  href={`/manager/users/${user.id}/edit`}
                  labelAction={"Edit"}
                />
              )}
              {(user.suspended || !user.disabled) && (
                <ActionBtn
                  as="modal"
                  modalTitle={
                    user.suspended
                      ? "Are you reactivate sure?"
                      : !user.disabled
                      ? "Are you suspend sure?"
                      : ""
                  }
                  modalSubtitle={
                    user.suspended
                      ? "This action will reactivate the account"
                      : !user.disabled
                      ? "The account has been temporarily deactivated and can be activated at any time by the user."
                      : ""
                  }
                  onSubmit={async () => {
                    if (user.suspended || !user.disabled) {
                      await handleAction(
                        user.id,
                        user.suspended ? "reactivate" : "suspend"
                      );
                    }
                  }}
                  destructive={!user.suspended}
                  labelAction={
                    user.suspended ? "Active" : !user.disabled ? "Suspend" : ""
                  }
                  className={
                    user.suspended
                      ? "bg-green-400 hover:bg-green-400/90"
                      : !user.disabled
                      ? "bg-amber-400 hover:bg-amber-400/90"
                      : ""
                  }
                />
              )}
              {(user.disabled || !user.suspended) && (
                <ActionBtn
                  as="modal"
                  modalSubtitle={
                    user.disabled
                      ? "This action will enable the account"
                      : !user.suspended
                      ? "The account is permanently disabled and requires admin intervention for reactivation."
                      : ""
                  }
                  modalTitle={
                    user.disabled
                      ? "Are you sure to enable this account?"
                      : !user.suspended
                      ? "Are you sure to disable this account?"
                      : ""
                  }
                  destructive={!user.disabled}
                  labelAction={
                    user.disabled
                      ? "Enabled"
                      : !user.suspended
                      ? "Disactivate"
                      : ""
                  }
                  onSubmit={async () => {
                    if (user.disabled || !user.suspended) {
                      await handleAction(
                        user.id,
                        user.disabled ? "enable" : "disable"
                      );
                    }
                  }}
                  className={
                    user.disabled
                      ? "bg-green-400 hover:bg-green-400/90"
                      : !user.suspended
                      ? "bg-destructive hover:bg-destructive/90"
                      : ""
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
