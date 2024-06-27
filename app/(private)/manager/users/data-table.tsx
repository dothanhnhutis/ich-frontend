"use client";

import React, { useMemo } from "react";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-header";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUser } from "@/service/api/user.service";

export const DataTable = () => {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor("email", {
        enableHiding: false,
        size: 300,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-full truncate font-medium">
                {row.getValue("email")}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("username", {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        size: 200,
        cell: ({ row }) => {
          return (
            <p className="max-w-full truncate font-medium">
              {row.getValue("username")}
            </p>
          );
        },
      }),
      columnHelper.accessor("role", {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        size: 150,
        cell: ({ row }) => {
          return (
            <p className="max-w-full truncate font-medium">
              {row.getValue("role")}
            </p>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      }),
      columnHelper.accessor("isActive", {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Active" />
        ),
        size: 100,
        cell: ({ row }) => {
          return (
            <p className="max-w-full truncate font-medium">
              {row.getValue("isActive") ? "True" : "False"}
            </p>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      }),
      columnHelper.display({
        id: "actions",
        size: 100,
        enableResizing: false,
        cell: ({ row, getValue, column, table }) => (
          <div>DataTableRowActions</div>
          //   <DataTableRowActions
          //     row={row}
          //     getValue={getValue}
          //     column={column}
          //     table={table}
          //   />
        ),
      }),
    ];
  }, []);

  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUser(),
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Table className="w-full table-fixed bg-background">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  style={{ width: `${header.getSize()}px` }}
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-14 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
