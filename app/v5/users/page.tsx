import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import {
  ArrowDownNarrowWideIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  FilterIcon,
  ListFilterIcon,
  LogOutIcon,
  MailIcon,
  PlusIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { DarkMode } from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const UserManagementPage = () => {
  return (
    <div className="bg-background rounded-xl p-4">
      <h3 className="font-bold text-2xl">User management</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your user and their account permission here.
      </p>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex gap-2 items-center overflow-x-scroll">
          <Button variant="secondary">Active</Button>
          <Button variant="ghost">Suspended</Button>
          <Button variant="ghost">Disabled</Button>
        </div>
        <div className="flex justify-between">
          <h4 className="font-bold text-lg">All users (100)</h4>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-2 gap-1" variant="outline" size="sm">
                  <FilterIcon className="size-4 flex-shrink-0" />
                  <p className="hidden md:inline ">Filter</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                className="rounded-xl p-0"
              >
                <div className="flex items-center justify-between py-2 px-3 border-b">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="size-4 flex-shrink-0" />
                    <p className="text-sm">Filter</p>
                  </div>
                  <XIcon className="flex-shrink-0 size-4" />
                </div>

                <div className="border-b py-2 px-1">
                  <Label className="px-2">Verified</Label>
                  <RadioGroup defaultValue="comfortable" className="gap-0">
                    <Label
                      htmlFor="r1"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r1" />
                      <p>A-Z</p>
                    </Label>
                    <Label
                      htmlFor="r2"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r2" />
                      <p>Z-A</p>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between py-2 px-3 border-t">
                  <Button variant="secondary" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply now</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-2 gap-1" variant="outline" size="sm">
                  <ArrowDownNarrowWideIcon className="size-4 flex-shrink-0" />
                  <p className="hidden md:inline">Sort</p>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                side="bottom"
                className="rounded-xl p-0"
              >
                <div className="flex items-center justify-between py-2 px-3 border-b">
                  <div className="flex items-center gap-2">
                    <ArrowDownNarrowWideIcon className="size-4 flex-shrink-0" />
                    <p>Sort</p>
                  </div>
                  <XIcon className="flex-shrink-0 size-4" />
                </div>

                <div className="border-b py-2 px-1">
                  <Label className="px-2">Email</Label>
                  <RadioGroup defaultValue="comfortable" className="gap-0">
                    <Label
                      htmlFor="r1"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r1" />
                      <p>A-Z</p>
                    </Label>
                    <Label
                      htmlFor="r2"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r2" />
                      <p>Z-A</p>
                    </Label>
                  </RadioGroup>
                </div>
                <div className="border-b py-2 px-1">
                  <Label className="px-2">Email</Label>
                  <RadioGroup defaultValue="comfortable" className="gap-0">
                    <Label
                      htmlFor="r3"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r3" />
                      <p>Ascending</p>
                    </Label>
                    <Label
                      htmlFor="r4"
                      className="flex items-center gap-2 hover:bg-primary/60 p-2 py-3 rounded"
                    >
                      <RadioGroupItem value="comfortable" id="r4" />
                      <p>Descending</p>
                    </Label>
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-between py-2 px-3 border-t">
                  <Button variant="secondary" size="sm">
                    Reset
                  </Button>
                  <Button size="sm">Apply now</Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button className="p-2 gap-1" size="sm">
              <PlusIcon className="size-4 flex-shrink-0" />
              <p className="hidden md:inline">Add user</p>
            </Button>
          </div>
        </div>
        <ScrollArea className="border rounded-lg w-full overflow-x-scroll">
          <Table className="table-fixed ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">User name</TableHead>
                <TableHead className="w-[200px]">Role</TableHead>
                <TableHead className="w-[200px]">Verified</TableHead>
                <TableHead className="w-[200px]">Date added</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base">Thanh Nhut</p>
                    <p className="text-xs text-muted-foreground">
                      gaconght@gmail.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>True</TableCell>
                <TableCell>10:37:30 15/01/2024</TableCell>
                <TableCell>
                  <EllipsisVerticalIcon className="size-4 flex-shrink-0" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-base">Thanh Nhut</p>
                    <p className="text-xs text-muted-foreground">
                      gaconght@gmail.com
                    </p>
                  </div>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>True</TableCell>
                <TableCell>10:37:30 15/01/2024</TableCell>
                <TableCell>
                  <EllipsisVerticalIcon className="size-4 flex-shrink-0" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" asChild />
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserManagementPage;
