"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CurrentUser } from "@/schemas/user";
import { searchUser } from "@/service/api/user.service";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

export const DataTable = ({ currentUser }: { currentUser?: CurrentUser }) => {
  const columns = useMemo(() => {
    return [
      {
        enableHiding: false,
        header: () => <TableHead>Email</TableHead>,
        cell: (d: any) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-full truncate font-medium">{d.email}</span>
            </div>
          );
        },
        filterFn: () => {
          return true;
        },
      },
    ];
  }, []);

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await searchUser(),
    select: (data) => {
      return {
        ...data,
        users: [data.users[0], data.users[2]],
      };
    },
  });
  console.log(data);

  return (
    <div className="space-y-2 relative">
      <ScrollArea className="border rounded-lg bg-background">
        <Table className="w-full table-fixed bg-background">
          <TableHeader>
            <TableRow>{columns.map(({ header }) => header())}</TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.users.length > 0 &&
              data.users.map((d) => (
                <TableRow>{columns.map((c) => c.cell(d))}</TableRow>
              ))}
            <TableRow>
              <TableCell className="h-14 text-center">No results.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
