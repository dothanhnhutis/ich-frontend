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
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
  TableIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  UserConextFilterType,
  useUserData,
} from "@/components/providers/user-provider";
import { omit } from "lodash";
import { Badge } from "@/components/ui/badge";
import { roles } from "@/schemas/user";

const UserFilterSheet = (filter: UserConextFilterType) => {
  const [isOpenFilter, setOpenFilter] = useState<boolean>(false);
  const { setFilter } = useUserData();
  const [data, setData] = useState<UserConextFilterType>(filter);

  const handleAddEmail = (email: string) => {
    setData((prev) => ({
      ...prev,
      emails: prev.emails ? [...prev.emails, email] : [email],
    }));
  };

  const handleRemoveEmail = (index: number) => {
    if (data.emails) {
      if (data.emails.length == 1) {
        setData((prev) => omit(prev, ["emails"]));
      } else {
        const newEmails = data.emails.filter((_, i) => i != index);
        setData((prev) => ({
          ...prev,
          emails: newEmails,
        }));
      }
    }
  };

  useEffect(() => {
    if (isOpenFilter) setData(filter);
  }, [isOpenFilter]);

  const handleSave = () => {
    console.log(data);
    setFilter(data);
    setOpenFilter(false);
  };

  const handleClear = () => {
    setData({});
  };
  const handleCancel = () => {
    setOpenFilter(false);
  };

  return (
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
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <XIcon className="size-5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <Label>Email</Label>
          <div className="flex gap-2 flex-col items-start justify-center">
            {data.emails &&
              data.emails.map((email, index) => (
                <InputFilter
                  key={index}
                  value={email}
                  index={index}
                  handleAddEmail={handleAddEmail}
                  handleRemoveEmail={handleRemoveEmail}
                />
              ))}
            <InputFilter
              isLast={true}
              handleAddEmail={handleAddEmail}
              handleRemoveEmail={handleRemoveEmail}
            />
          </div>
          <Label>Role</Label>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Role
                {data.roles && (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                    >
                      {data.roles.length}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {data.roles.length > 3 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal"
                        >
                          {data.roles.length} selected
                        </Badge>
                      ) : (
                        data.roles.map((role) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="rounded-sm px-1 font-normal"
                          >
                            {role}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className=" p-0" align="start">
              <Command>
                <CommandInput placeholder={"Role"} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {roles.map((role, i) => (
                      <CommandItem
                        key={i}
                        onSelect={() => {
                          if (data.roles?.includes(role)) {
                            if (data.roles.length == 1) {
                              setData((prev) => omit(prev, ["roles"]));
                            } else {
                              setData((prev) => ({
                                ...prev,
                                roles: prev.roles?.filter((r) => r != role),
                              }));
                            }
                          } else {
                            setData((prev) => ({
                              ...prev,
                              roles: prev.roles
                                ? [...prev.roles, role]
                                : [role],
                            }));
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            data.roles?.includes(role)
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>
                        <span>{role}</span>

                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          99
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {data.roles && data.roles.length > 0 && (
                    <>
                      <CommandSeparator />
                      <CommandGroup>
                        <CommandItem
                          onSelect={() =>
                            setData((prev) => omit(prev, ["roles"]))
                          }
                          className="justify-center text-center"
                        >
                          Clear filters
                        </CommandItem>
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Command>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <p>sadasd</p>
              </PopoverTrigger>
              <PopoverContent>
                <CommandInput placeholder="Type a command or search..." />
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandList>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </CommandList>
              </PopoverContent>
            </Popover>
          </Command>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-background z-10">
          <div className="flex justify-between items-center p-4">
            <Button variant="link" onClick={handleClear}>
              Clear
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UserFilterToolBar = () => {
  const { filter, setFilter, clearFilter, setViewMode, viewMode } =
    useUserData();

  return (
    <div className="flex gap-4">
      <div className="inline-flex items-center flex-wrap gap-2 w-full">
        <UserFilterSheet {...filter} />

        {filter?.emails && (
          <div className="flex items-center gap-2 border rounded-lg p-2 h-10 text-sm">
            <input
              value={filter.emails.join(",")}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  emails: e.target.value.split(","),
                });
              }}
              type="text"
              placeholder="Email..."
              className="outline-none bg-transparent"
              spellCheck="false"
            />
            <Separator orientation="vertical" />
            {filter.emails.length == 1 && filter.emails[0] == "" ? (
              <XIcon className="size-5 cursor-pointer" />
            ) : (
              <SearchIcon className="size-5 cursor-pointer" />
            )}
          </div>
        )}
        {(filter?.emails || filter?.roles) && (
          <Button variant="ghost" onClick={() => clearFilter()}>
            Reset
            <XIcon className="size-4 ml-2" />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <span className="hidden sm:inline">Sort by</span>
          <ArrowUpDownIcon className="size-4 sm:ml-2" />
        </Button>
        <Button
          onClick={() => {
            setViewMode(viewMode == "card" ? "list" : "card");
          }}
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
  );
};

type InputFilterType = {
  isLast?: boolean;
  index?: number;
  value?: string;
  handleRemoveEmail: (index: number) => void;
  handleAddEmail: (email: string) => void;
};

const InputFilter = ({
  isLast = false,
  index = -1,
  value = "",
  handleAddEmail,
  handleRemoveEmail,
}: InputFilterType) => {
  const [email, setEmail] = useState<string>(value);
  return (
    <div className="flex gap-2 border rounded-lg p-2 h-10 text-sm w-full">
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="Email..."
        className="outline-none bg-transparent w-full"
      />
      <Separator orientation="vertical" />
      {isLast ? (
        <PlusIcon
          onClick={() => {
            if (email) {
              handleAddEmail(email);
              setEmail("");
            }
          }}
          className="size-5 cursor-pointer"
        />
      ) : (
        <XIcon
          onClick={() => handleRemoveEmail(index)}
          className="size-5 cursor-pointer"
        />
      )}
    </div>
  );
};

export const FilterUser = ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  const userData = useUserData();

  const { data, isPending } = useQuery({
    queryKey: ["users", searchParams?.tab],
    queryFn: async () => {
      return await searchUser();
    },
  });

  return (
    <>
      <div
        className={cn(
          "bg-card text-card-foreground border p-2 space-y-2",
          userData.viewMode == "list"
            ? "rounded-tl-lg rounded-tr-lg"
            : "rounded-lg"
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
        <UserFilterToolBar />
      </div>
      {userData.viewMode == "list" ? (
        <ListView data={data?.users} />
      ) : (
        <CardView data={data?.users} />
      )}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center justify-center text-sm font-medium">
          Page 1 of 10
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
