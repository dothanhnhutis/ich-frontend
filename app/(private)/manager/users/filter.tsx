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
import { Role } from "@/schemas/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const roleOption: Role[] = ["MANAGER", "SALER", "WRITER", "CUSTOMER"];

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
      <SheetContent className="p-0 w-full">
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex justify-between items-center p-4">
            <h3 className="text-card-foreground font-semibold text-lg">
              Filter
            </h3>
            <Button size="icon" variant="ghost" onClick={handleCancel}>
              <XIcon className="size-5" />
            </Button>
          </div>
          <div className="relative">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start h-8 border-dashed"
                  >
                    <PlusCircleIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    Role
                    {data.roles && (
                      <>
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-4"
                        />

                        <div className="space-x-1 overflow-hidden">
                          {data.roles.slice(0, 3).map((role) => (
                            <Badge
                              key={role}
                              variant="secondary"
                              className="rounded-sm px-1 font-normal"
                            >
                              {role}
                            </Badge>
                          ))}
                          {data.roles.length > 3 && (
                            <Badge
                              variant="secondary"
                              className="rounded-sm px-1 font-normal capitalize"
                            >
                              <span>+{data.roles.length - 3} </span>
                              <span className="sm:hidden ml-1">selected</span>
                            </Badge>
                          )}
                        </div>
                      </>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[calc(100vw_-_32px)] sm:w-[350px] p-0"
                  align="start"
                >
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {roleOption.map((role, i) => (
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
              <Label>Email verify</Label>
              <RadioGroup
                value={
                  data.emailVerified == true
                    ? "1"
                    : data.emailVerified == undefined
                    ? ""
                    : "0"
                }
                onValueChange={(v) =>
                  setData((prev) => ({ ...prev, emailVerified: v == "1" }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="r2" />
                  <Label htmlFor="r2">False</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="fixed bottom-0 left-[-10px] right-0 bg-red-500 z-10 ">
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
          </div>
        </div>
      </SheetContent>
    </Sheet>
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

const UserFilterToolBar = () => {
  const { setViewMode, viewMode } = useUserData();

  return (
    <div className="flex gap-4">
      <div className="inline-flex items-center flex-wrap gap-2 w-full">
        <UserFilterSheet />
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
