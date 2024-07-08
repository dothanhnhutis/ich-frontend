import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export const CardView = () => {
  return (
    <div className="mt-10">
      <div className="rounded-lg bg-background w-full">
        <div className="flex items-center justify-between py-3 px-4 border-b text-sm font-medium ">
          <p>ID user: 123123132123</p>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-primary font-bold">
              Chat
            </Link>
            <Separator orientation="vertical" />
            <p>03/07/2024 10:42:42 </p>
          </div>
        </div>

        <div className="flex  gap-2 p-4">
          <div className="grid grid-cols-[52px_1fr_1fr] w-full">
            <Avatar className="rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 text-sm font-semibold text-muted-foreground">
              <p className="text-base">gaconght@gmail.com</p>
              <p>Thanh Nhut</p>
            </div>
            <div className="font-bold">ADMIN</div>
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
    </div>
  );
};
