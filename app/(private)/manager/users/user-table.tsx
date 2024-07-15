import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { SearchUserRes } from "@/service/api/user.service";
import { toast } from "sonner";
import Link from "next/link";
const UserTableView = ({ data = [] }: { data?: SearchUserRes[] }) => {
  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copy ID success");
  };
  return (
    <div className="bg-card text-card-foreground border rounded-bl-lg rounded-br-lg border-t-0">
      <Table className="w-full table-fixed ">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Verified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((user) => (
              <ContextMenu key={user.id}>
                <ContextMenuTrigger asChild>
                  <TableRow>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="max-w-full truncate font-medium">
                          {user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="max-w-full truncate font-medium">
                          {user.username}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="max-w-full truncate font-medium">
                          {user.role}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <span className="max-w-full truncate font-medium">
                          {user.emailVerified ? "True" : "False"}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => copyToClipboard(user.id)}>
                    Copy ID
                  </ContextMenuItem>
                  <Link href={`/manager/users/${user.id}/edit`}>
                    <ContextMenuItem>Edit</ContextMenuItem>
                  </Link>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>Suspended</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                      <ContextMenuCheckboxItem checked>
                        True
                      </ContextMenuCheckboxItem>
                      <ContextMenuCheckboxItem>False</ContextMenuCheckboxItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                </ContextMenuContent>
              </ContextMenu>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-14 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTableView;
