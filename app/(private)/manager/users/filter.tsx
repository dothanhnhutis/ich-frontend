"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpDownIcon,
  CheckIcon,
  FilterIcon,
  Grid3X3Icon,
  LayoutPanelTopIcon,
  ListIcon,
  SearchIcon,
  TableIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ListView from "./list";
import { cn } from "@/lib/utils";
import { CardView } from "./card";
import { useQuery } from "@tanstack/react-query";
import { searchUser, SearchUserInput } from "@/service/api/user.service";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
export const FilterUser = ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const [isOpenFilter, setOpenFilter] = useState<boolean>(false);

  const [filter, setFilter] = useState<SearchUserInput>(() => {
    const result: SearchUserInput = {
      page: 1,
      take: 10,
    };
    if (searchParams?.tab == "inActive") {
      result.inActive = true;
    }
    if (searchParams?.tab == "suspended") {
      result.suspended = true;
    }
    return result;
  });

  const { data, isPending } = useQuery({
    queryKey: ["users", searchParams?.tab],
    queryFn: async () => {
      return await searchUser(filter);
    },
  });

  return (
    <>
      <div
        className={cn(
          "bg-card text-card-foreground border p-2 space-y-2",
          viewMode == "list" ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"
        )}
      >
        <div className="flex items-center flex-grow border-b">
          <Link
            href="/manager/users?tab=active"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "active" ? "border-b-2 border-primary" : ""
            )}
          >
            Active
          </Link>
          <Link
            href="/manager/users?tab=inactive"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "inactive" ? "border-b-2 border-primary" : ""
            )}
          >
            InActive
          </Link>
          <Link
            href="/manager/users?tab=suspended"
            className={cn(
              "font-semibold p-2",
              searchParams?.tab == "suspended"
                ? "border-b-2 border-primary"
                : ""
            )}
          >
            Suspended
          </Link>
        </div>
        <div className="flex gap-4">
          <div className="inline-flex items-center flex-wrap gap-2 w-full">
            <Sheet open={isOpenFilter} onOpenChange={setOpenFilter}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <span className="hidden sm:inline">Filter</span>
                  <FilterIcon className="size-4 sm:ml-2" />
                </Button>
              </SheetTrigger>
              <SheetContent className="max-h-screen overflow-y-scroll p-0 w-full sm:w-3/4">
                <div className="sticky top-0 left-0 right-0 bg-background z-10">
                  <div className="flex justify-between items-center p-4">
                    <h3 className="text-card-foreground font-semibold text-lg">
                      Filter
                    </h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setOpenFilter(false)}
                    >
                      <XIcon className="size-5" />
                    </Button>
                  </div>
                </div>
                <form className="p-4">
                  <Label>Role</Label>
                  <Command>
                    <CommandInput placeholder="Role" />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem>
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              false
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className={cn("h-4 w-4")} />
                          </div>
                          <span>10</span>

                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            20
                          </span>
                        </CommandItem>
                      </CommandGroup>

                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem className="justify-center text-center">
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    </CommandList>
                  </Command>
                  <div className="h-[2000px] bg-red-400"></div>
                </form>
                <div className="sticky bottom-0 left-0 right-0 bg-background z-10">
                  <div className="flex justify-between items-center p-4">
                    <Button variant="link">Clear</Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setOpenFilter(false)}
                      >
                        Cancel
                      </Button>
                      <Button>Save</Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 border rounded-lg p-2 h-10 text-sm">
              <input
                type="text"
                placeholder="Email..."
                className="outline-none bg-transparent"
              />
              <Separator orientation="vertical" />
              <SearchIcon className="size-5 cursor-pointer" />
            </div>
            <Button variant="ghost">
              Reset
              <XIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <span className="hidden sm:inline">Sort by</span>
              <ArrowUpDownIcon className="size-4 sm:ml-2" />
            </Button>
            <Button
              onClick={() =>
                setViewMode((prev) => (prev == "card" ? "list" : "card"))
              }
              size="icon"
              variant="outline"
            >
              {viewMode == "list" ? (
                <TableIcon className="size-4" />
              ) : (
                <LayoutPanelTopIcon className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {viewMode == "list" ? (
        <ListView data={data?.users} />
      ) : (
        <CardView data={data?.users} />
      )}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center justify-center text-sm font-medium">
          Page {filter.page} of 10
        </div>
        <Pagination className="w-auto mx-0 mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
