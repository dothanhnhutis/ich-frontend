import Link from "next/link";
import { toast } from "sonner";
import { Column, Getter, Row, Table } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CurrentUser, Role } from "@/schemas/user";
import { activeOptions } from "./data-table-toolbar";

interface DataTableRowActionsProps {
  row: Row<CurrentUser>;
  getValue: Getter<unknown>;
  column: Column<CurrentUser, unknown>;
  table: Table<CurrentUser>;
}
const roles: Role[] = ["CUSTOMER", "MANAGER", "WRITER"];

export function DataTableRowActions({
  row,
  table,
  getValue,
  column,
}: DataTableRowActionsProps) {
  const { id, email, createdAt, updatedAt, ...other } =
    row.original as CurrentUser;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.success("Copy ID success");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <Link href={`/manager/users/${id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Active</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={other.isActive ? "true" : "false"}>
              {activeOptions.map((active) => (
                <DropdownMenuRadioItem
                  onClick={() => {
                    // if (other.isActive != active.value)
                    //   table.options.meta?.updateData(row.index, column.id, {
                    //     id,
                    //     data: {
                    //       isActive: active.value,
                    //     },
                    //   });
                  }}
                  key={active.value ? "true" : "false"}
                  value={active.value ? "true" : "false"}
                >
                  {active.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={other.role}>
              {roles.map((role) => (
                <DropdownMenuRadioItem
                  onClick={() => {
                    // if (other.role != role)
                    //   table.options.meta?.updateData(row.index, column.id, {
                    //     id,
                    //     data: {
                    //       role,
                    //     },
                    //   });
                  }}
                  key={role}
                  value={role}
                >
                  {role}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
