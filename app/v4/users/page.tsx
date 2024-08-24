import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import {
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ListFilterIcon,
  LogOutIcon,
  MailIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { DarkMode } from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const UserManagementPage = () => {
  return (
    <div className="bg-background rounded-xl p-4">
      <h3 className="font-bold text-2xl">User management</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your user and their account permission here.
      </p>
      <div className="flex flex-col mt-4 gap-4 h-[2000px]">
        <div className="flex gap-2 items-center overflow-x-scroll">
          <Button variant="secondary">Active</Button>
          <Button variant="ghost">Suspended</Button>
          <Button variant="ghost">Disabled</Button>
        </div>
        <div className="flex justify-between">
          <h4 className="font-bold text-lg">All users (100)</h4>
          <div className="flex items-center gap-2">
            <Button className="px-2 gap-1" variant="outline" size="sm">
              <ListFilterIcon className="size-4 flex-shrink-0" />
              Filters
            </Button>
            <Button className="px-2 gap-1" size="sm">
              <PlusIcon className="size-6 flex-shrink-0" />
              Add user
            </Button>
          </div>
        </div>
        <ScrollArea className="border rounded-lg w-full overflow-x-scroll">
          <Table className="table-fixed ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">User name</TableHead>
                <TableHead className="w-[400px]">Role</TableHead>
                <TableHead className="w-[400px]">Verified</TableHead>
                <TableHead className="w-[400px]">Date added</TableHead>
                <TableHead className="w-[400px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base">Thanh Nhut</p>
                    <p className="text-xs text-muted-foreground">
                      gaconght@gmail.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>True</TableCell>
                <TableCell>10:37:30 15/01/2024</TableCell>
                <TableCell>
                  <EllipsisVerticalIcon className="size-4 flex-shrink-0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base">Thanh Nhut</p>
                    <p className="text-xs text-muted-foreground">
                      gaconght@gmail.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>True</TableCell>
                <TableCell>10:37:30 15/01/2024</TableCell>
                <TableCell>
                  <EllipsisVerticalIcon className="size-4 flex-shrink-0" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserManagementPage;
