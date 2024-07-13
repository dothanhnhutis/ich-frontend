import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SearchUserRes } from "@/service/api/user.service";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const UserCardView = ({ data = [] }: { data?: SearchUserRes[] }) => {
  if (!data || data.length == 0) return <p>nodata</p>;
  return (
    <div className="flex flex-col gap-4">
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
              <Avatar className="rounded-lg">
                <AvatarImage
                  src={user.picture || "https://github.com/shadcn.png"}
                  alt="avatar"
                />
                <AvatarFallback className="rounded-lg">ICH</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-base font-semibold">{user.username}</p>
                <p>{user.email}</p>
                <div className="flex gap-2 items-center">
                  {user.linkProvider.map((l) => (
                    <Badge key={l.provider}>{l.provider}</Badge>
                  ))}
                </div>
              </div>
              <div className="font-semibold">{user.role}</div>
            </div>

            <div className="flex flex-col gap-2 w-32">
              <Button size="sm" className="text-xs p-1 h-auto">
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="text-xs p-1 h-auto"
              >
                Suspended
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
