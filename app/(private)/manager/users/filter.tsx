"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FilterIcon,
  Grid3X3Icon,
  LayoutPanelTopIcon,
  ListIcon,
  MoreHorizontalIcon,
  PlusCircleIcon,
  PlusIcon,
  SearchIcon,
  TableIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  UserOrderBy,
  useUserData,
} from "@/components/providers/user-provider";
import { omit, pick } from "lodash";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/schemas/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const roleOption: Role[] = ["MANAGER", "SALER", "WRITER", "CUSTOMER"];

const UserFilterSheet = (
  init: Pick<UserConextFilterType, "emails" | "roles" | "emailVerified">
) => {
  const [isOpenFilter, setOpenFilter] = useState<boolean>(false);
  const { setFilter } = useUserData();
  const [data, setData] =
    useState<Pick<UserConextFilterType, "emails" | "roles" | "emailVerified">>(
      init
    );

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
    if (isOpenFilter) setData(init);
  }, [isOpenFilter]);

  const handleSave = () => {
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
      <SheetContent showXBtn={false} className="p-0 w-full">
        <div className="flex flex-col flex-grow h-screen relative">
          <div className="sticky top-0 left-0 right-0 bg-background z-50">
            <div className="flex justify-between items-center px-4 mt-4">
              <h3 className="text-card-foreground font-semibold text-lg">
                Filter
              </h3>
              <Button size="icon" variant="ghost" onClick={handleCancel}>
                <XIcon className="size-5" />
              </Button>
            </div>
          </div>
          <div className="w-full p-4 pb-[72px] overflow-y-auto">
            <div className="flex flex-col gap-4">
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
                  <RadioGroupItem value="1" id="r1" className="size-5" />
                  <Label htmlFor="r1">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="r2" className="size-5" />
                  <Label htmlFor="r2">False</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="absolute bottom-0 right-4 left-4 bg-transparent z-50">
            <div className="flex justify-between items-center py-4 bg-background">
              <Button variant="link" onClick={handleClear} className="p-2">
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
      </SheetContent>
    </Sheet>
  );
};

const SortBy = ({
  title,
  field,
  handleChangeData,
  defaultValue = "all",
}: {
  title: string;
  field: keyof UserOrderBy;
  defaultValue?: "all" | "desc" | "asc";
  handleChangeData: (v: "all" | "desc" | "asc", key: keyof UserOrderBy) => void;
}) => {
  return (
    <>
      <Label className="text-lg">{title}</Label>
      <RadioGroup
        defaultValue={defaultValue}
        onValueChange={(v: "all" | "desc" | "asc") =>
          handleChangeData(v, field)
        }
        className="flex gap-2 items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id={`${field}-1`} className="size-5" />
          <Label htmlFor={`${field}-1`}>All</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="asc" id={`${field}-2`} className="size-5" />
          <Label htmlFor={`${field}-2`}>Asc</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="desc" id={`${field}-3`} className="size-5" />
          <Label htmlFor={`${field}-3`}>Desc</Label>
        </div>
      </RadioGroup>
    </>
  );
};

const UserSortBy = ({ init }: { init?: UserOrderBy[] }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserOrderBy[] | undefined>(init);
  const { setSortBy, filter } = useUserData();

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (!data) {
      setSortBy();
    } else {
      setSortBy({ ...filter, orderBy: data });
    }
    setOpen(false);
  };

  const mergateOrderBy = useMemo(() => {
    return data?.reduce((prev, curr) => {
      const tmp = {
        ...prev,
        ...curr,
      };

      return tmp;
    }, {});
  }, [data]);

  const handleChangeData = (
    v: "all" | "desc" | "asc",
    key: keyof UserOrderBy
  ) => {
    if (v == "all") {
      setData((prev) => {
        if (prev) {
          const tmp = prev.filter((s) => !(key in s));
          return tmp.length > 0 ? tmp : undefined;
        } else {
          return prev;
        }
      });
    } else {
      setData((prev) => {
        if (prev) {
          if (prev.some((s) => key in s)) {
            return prev.map((s) => (key in s ? { [key]: v } : s));
          } else {
            return [...prev, { [key]: v }];
          }
        } else {
          return [{ [key]: v }];
        }
      });
    }
  };

  useEffect(() => {
    if (isOpen) setData(init);
  }, [isOpen, init]);

  return (
    <Popover onOpenChange={setOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <span className="hidden sm:inline">Sort by</span>
          <ArrowUpDownIcon className="size-4 sm:ml-2" />
          {filter?.orderBy && (
            <span className="ml-1">({filter.orderBy.length})</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[400px] space-y-2" align="end">
        <Label className="text-xl">Sort by</Label>
        <div className="flex flex-col justify-center gap-4">
          <SortBy
            title="Email"
            field="email"
            defaultValue={mergateOrderBy?.email || "all"}
            handleChangeData={handleChangeData}
          />
          <SortBy
            title="Role"
            field="role"
            defaultValue={mergateOrderBy?.role || "all"}
            handleChangeData={handleChangeData}
          />
          <SortBy
            title="Emai verify"
            field="emailVerified"
            defaultValue={mergateOrderBy?.emailVerified || "all"}
            handleChangeData={handleChangeData}
          />
          <Label className="text-lg">Role</Label>
        </div>
        <div className="flex items-center justify-end py-4 gap-2">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </PopoverContent>
    </Popover>
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

const ViewModeBtn = () => {
  const { setViewMode, viewMode } = useUserData();

  return (
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
  );
};

const UserFilterToolBar = () => {
  const { filter } = useUserData();

  return (
    <div className="flex gap-4">
      <div className="inline-flex items-center flex-wrap gap-2 w-full">
        <UserFilterSheet
          {...pick(filter, ["emails", "roles", "emailVerifyed"])}
        />
      </div>
      <div className="flex gap-2">
        <UserSortBy init={filter?.orderBy} />
        <ViewModeBtn />
      </div>
    </div>
  );
};

const neighbourhood = 1;
const size = 5;

function caculatorPageShow(totalPage: number, currentPage: number) {
  if (totalPage <= 6) {
    return Array.from({ length: totalPage }, (_, id) =>
      currentPage == id + 1 ? "?" : `${id + 1}`
    );
  } else {
    return [];

    // if(currentPage - 1 < totalPage - currentPage){
    //   return []
    // }else if(currentPage - 1 < totalPage - currentPage){

    // }else {

    // }
  }
}

const UserPagination = () => {
  const { filter, setPagination } = useUserData();

  console.log(caculatorPageShow(6, 6));
  // console.log(Array.from({ length: 100 }, (_, id) => id + 1));
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center justify-center text-sm font-medium">
        Page {filter?.page} of {10}
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span>1</span>
          </Button>
          {}
          <Button variant="outline" className="h-8 w-8 p-0">
            <span>{20}</span>
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          <Button variant="outline" className="h-8 w-8 p-0 cursor-not-allowed">
            <span className="sr-only">More pages</span>
            <MoreHorizontalIcon className="h-4 w-4" />
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

export const FilterUser = ({
  searchParams,
}: {
  searchParams?: { [index: string]: string | string[] | undefined };
}) => {
  const { viewMode, filter, setPagination } = useUserData();

  const { data, isPending } = useQuery({
    queryKey: ["users", searchParams?.tab, filter],
    retry: 2,
    queryFn: async () => {
      return await searchUser({
        limit: 2,
        page: 2,
        roles: filter?.roles,
        orderBy: filter?.orderBy?.map(
          (a) => Object.entries(a).map((a) => a.join("."))[0] as any
        ),
      });
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
        <UserFilterToolBar />
      </div>
      {viewMode == "list" ? (
        <ListView data={data?.users} />
      ) : (
        <CardView data={data?.users} />
      )}
      <UserPagination />
    </>
  );
};
