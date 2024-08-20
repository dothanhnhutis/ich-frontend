"use client";
import {
  UserConextFilterType,
  useUserData,
} from "@/components/providers/user-manager-provider";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  FilterIcon,
  PlusCircleIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@/schemas/user";

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

const roleOption: User["role"][] = ["Manager", "Saler", "Bloger", "Customer"];

export const UserFilterSheet = (
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
