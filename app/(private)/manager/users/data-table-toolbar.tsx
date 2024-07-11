import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CurrentUser, Role } from "@/schemas/user";

interface DataTableToolbarProps {
  table: Table<CurrentUser>;
  role: Role;
}

export const activeOptions: { label: string; value: boolean }[] = [
  { label: "True", value: true },
  { label: "False", value: false },
];

export const roleOptions: { label: string; value: Role }[] = [
  { label: "CUSTOMER", value: "CUSTOMER" },
  { label: "WRITER", value: "WRITER" },
  { label: "MANAGER", value: "MANAGER" },
];

export function DataTableToolbar({ table, role }: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 overflow-x-scroll">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-[150px] lg:w-[250px] focus-visible:ring-transparent"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roleOptions}
          />
        )}
        {table.getColumn("isActive") && (
          <DataTableFacetedFilter
            column={table.getColumn("isActive")}
            title="Active"
            options={activeOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
