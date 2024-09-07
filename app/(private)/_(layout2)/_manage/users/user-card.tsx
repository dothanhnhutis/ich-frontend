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
import { useQueryClient } from "@tanstack/react-query";

export const UserCardView = ({ data = [] }: { data?: SearchUserRes[] }) => {
  if (!data || data.length == 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <CardEmpty />
      </div>
    );
  const queryClient = useQueryClient();

  const handleAction = async (
    id: string,
    type: "suspend" | "reactivate" | "disable" | "enable"
  ) => {
    const { success, message } = await editUserById(id, {
      status:
        type == "reactivate" || type == "enable"
          ? "Active"
          : type == "suspend"
          ? "Suspended"
          : "Disabled",
    });
    if (success) {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
            <p>ID: {user.id}</p>
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
                  referrerPolicy="no-referrer"
                  src={user.picture || "https://github.com/shadcn.png"}
                  alt="avatar"
                />
                <AvatarFallback>ICH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-base font-semibold">
                  {user.firstName + " " + user.lastName}
                </p>
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
              {user.status == "Active" ? (
                <>
                  <ActionBtn
                    as="link"
                    href={`/manager/users/${user.id}/edit`}
                    labelAction="Edit"
                  />
                  <ActionBtn
                    as="modal"
                    modalTitle="Are you suspend sure?"
                    modalSubtitle="The account has been temporarily deactivated and can be activated at any time by the user."
                    onSubmit={async () => {
                      await handleAction(user.id, "suspend");
                      queryClient.invalidateQueries({
                        queryKey: ["user", "active"],
                      });
                    }}
                    destructive
                    labelAction="Suspend"
                    className="bg-amber-400 hover:bg-amber-400/90"
                  />
                  <ActionBtn
                    as="modal"
                    modalSubtitle="The account is permanently disabled and requires admin intervention for reactivation."
                    modalTitle="Are you sure to disable this account?"
                    destructive
                    labelAction="Disable"
                    onSubmit={async () => {
                      await handleAction(user.id, "disable");
                      queryClient.invalidateQueries({
                        queryKey: ["user", "active"],
                      });
                    }}
                    className="bg-destructive hover:bg-destructive/90"
                  />
                </>
              ) : user.status == "Suspended" ? (
                <ActionBtn
                  as="modal"
                  modalTitle="Are you reactivate sure?"
                  modalSubtitle="This action will reactivate the account"
                  onSubmit={async () => {
                    await handleAction(user.id, "reactivate");
                    queryClient.invalidateQueries({
                      queryKey: ["user", "suspended"],
                    });
                  }}
                  labelAction="Reactivate"
                  className="bg-green-400 hover:bg-green-400/90"
                />
              ) : (
                <ActionBtn
                  as="modal"
                  modalTitle="Are you sure to enable this account?"
                  modalSubtitle="This action will enable the account"
                  labelAction="Enabled"
                  onSubmit={async () => {
                    await handleAction(user.id, "enable");
                    queryClient.invalidateQueries({
                      queryKey: ["user", "disabled"],
                    });
                  }}
                  className="bg-green-400 hover:bg-green-400/90"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
