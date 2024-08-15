"use client";
import { useUserData } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { caculatorPagination, cn } from "@/lib/utils";
export const UserPagination = ({ totalPage }: { totalPage: number }) => {
  const { filter, setPagination } = useUserData();
  return (
    <div className="flex items-center justify-between px-2 mt-2">
      <div className="flex items-center justify-center text-sm font-medium">
        Page {filter?.page} of {totalPage}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              setPagination({
                page: (filter?.page || 2) - 1,
                limit: filter?.limit || 10,
              });
            }}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={filter?.page == 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {caculatorPagination({
            totalPage,
            currentPage: filter?.page || 1,
          }).map((p) =>
            p != -1 ? (
              <Button
                onClick={() => {
                  setPagination({
                    page: p,
                    limit: filter?.limit || 10,
                  });
                }}
                key={p}
                variant="outline"
                className={cn(
                  "h-8 w-8 p-0",
                  filter?.page == p ? "border-primary" : ""
                )}
              >
                <span>{p}</span>
              </Button>
            ) : (
              <div className="h-8 w-8 cursor-not-allowed border rounded-lg flex justify-center bg-background opacity-50 items-center">
                <span className="sr-only">More pages</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </div>
            )
          )}

          <Button
            onClick={() => {
              setPagination({
                page: (filter?.page || 1) + 1,
                limit: filter?.limit || 10,
              });
            }}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={filter?.page == totalPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={`${filter?.limit || 10}`}
          onValueChange={(v) => {
            setPagination({ limit: parseInt(v) });
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder={"10 / page"} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
