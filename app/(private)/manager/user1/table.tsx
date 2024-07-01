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
import React, { useMemo } from "react";

export const DataTable = ({ currentUser }: { currentUser?: CurrentUser }) => {
  const columns = useMemo(() => {
    return [
      {
        enableHiding: false,
        header: () => <div>dasda</div>,
        cell: () => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-full truncate font-medium">dd</span>
            </div>
          );
        },
        filterFn: () => {
          return true;
        },
      },
    ];
  }, []);

  return (
    <div className="space-y-2 relative">
      <ScrollArea className="border rounded-lg bg-background">
        <Table className="w-full table-fixed bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>123</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="h-14 text-center">No results.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
