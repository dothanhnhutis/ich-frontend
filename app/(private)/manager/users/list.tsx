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
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { SearchUserRes } from "@/service/api/user.service";
const ListView = ({ data = [] }: { data?: SearchUserRes[] }) => {
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
                  <ContextMenuItem>Profile</ContextMenuItem>
                  <ContextMenuItem>Billing</ContextMenuItem>
                  <ContextMenuItem>Team</ContextMenuItem>
                  <ContextMenuItem>Subscription</ContextMenuItem>
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

export default ListView;
