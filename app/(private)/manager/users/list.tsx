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
import { DataTable } from "./data-table";
const ListView = () => {
  return (
    <Table className="w-full table-fixed bg-background">
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Verified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <TableRow>
              <TableCell>
                <div className="flex space-x-2">
                  <span className="max-w-full truncate font-medium">email</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <span className="max-w-full truncate font-medium">email</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <span className="max-w-full truncate font-medium">email</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <span className="max-w-full truncate font-medium">email</span>
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

        <TableRow>
          <TableCell colSpan={4} className="h-14 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ListView;
