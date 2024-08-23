import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LogoImg from "@/images/logos/logo.png";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, SettingsIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SettingsPage = () => {
  return (
    <div className="relative bg-accent">
      <div className="flex h-screen ">
        <TooltipProvider delayDuration={100} disableHoverableContent={true}>
          <div className="relative lg:w-[200px] flex-shrink-0 ">
            <Link href="/" prefetch={false} className="flex items-center p-2">
              <div className={cn("flex items-center size-10 lg:size-12")}>
                <AspectRatio
                  ratio={1 / 1}
                  className="flex items-center justify-center"
                >
                  <Image
                    priority
                    src={LogoImg.src}
                    width={LogoImg.width}
                    height={LogoImg.height}
                    alt="logo"
                    title="logo-ich"
                  />
                </AspectRatio>
              </div>
            </Link>

            <ScrollArea className="h-[calc(100vh_-_160px)] text-popover-foreground p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      false
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/20 hover:text-primary mb-1 last:mb-0"
                    )}
                  >
                    <UserIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                    <span className="text-sm hidden lg:inline">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden z-50"
                >
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      true
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-primary/20 hover:text-primary mb-1 last:mb-0"
                    )}
                  >
                    <UserIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                    <span className="text-sm hidden lg:inline">Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  className="lg:hidden z-50"
                >
                  <p>Profile1</p>
                </TooltipContent>
              </Tooltip>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 ">
              <div className="flex flex-col gap-2 p-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center p-2 rounded-lg",
                        false
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/20 hover:text-primary"
                      )}
                    >
                      <SettingsIcon className="block flex-shrink-0 size-6 lg:mr-2" />
                      <span className="text-sm hidden lg:inline">Settings</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    className="lg:hidden z-50"
                  >
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <div className="flex items-center justify-between w-full gap-2 bg-background p-1 lg:p-2 rounded-full lg:rounded-lg lg:border cursor-pointer">
                  <Avatar className="size-8">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={AvatarDefault.src}
                    />
                    <AvatarFallback className="bg-transparent">
                      <Skeleton className="size-8 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block w-full max-w-[102px]">
                    <p className="font-medium truncate text-sm ">
                      Thành Nhựt as da sd
                    </p>
                    <p className="text-muted-foreground text-xs">Admin</p>
                  </div>
                  <div className="hidden lg:block rounded-full">
                    <ChevronsUpDownIcon className="flex flex-shrink-0 size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>

        <div className="py-2 pr-2 h-screen w-full overflow-scroll mx-auto max-w-screen-xl">
          <div className="bg-background h-full border rounded-xl p-4">
            <h3 className="font-bold text-2xl">Account settings</h3>
            <p className="text-sm font-normal leading-snug text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
            <div className="flex flex-col mt-4 gap-4">
              <div className="flex gap-2 items-center">
                <Button variant="secondary">General</Button>
                <Button variant="ghost">Security</Button>
                <Button variant="ghost">Notifications</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">
                      <p className="font-bold">Basics</p>
                    </TableHead>
                    <TableHead></TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="max-w-[200px]">
                    <TableCell className="text-left align-top">
                      <p className="font-bold">Photo</p>
                      <p className="text-xs font-normal leading-snug text-muted-foreground">
                        This will be displayed on your profile
                      </p>
                    </TableCell>
                    <TableCell>
                      <Avatar className="size-14">
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={AvatarDefault.src}
                        />
                        <AvatarFallback className="bg-transparent">
                          <Skeleton className="size-20 rounded-full" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="justify-end flex flex-col gap-2">
                      <Button className="rounded-xl">Change picture</Button>
                      <Button variant="destructive" className="rounded-xl">
                        Delete picture
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className=" text-left align-top">
                      <p className="font-bold">Personal information</p>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">
                            First name
                          </Label>
                          <p className="font-bold text-base">Nhut</p>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm text-muted-foreground">
                            Last name
                          </Label>
                          <p className="font-bold text-base">Thanh</p>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm text-muted-foreground">
                            Phone
                          </Label>
                          <p className="font-bold text-base">123456789</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="justify-end">
                      <Button>Edit</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-left align-top">
                      <p className="font-bold">Personal location</p>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1 col-span-2">
                          <Label className="text-sm text-muted-foreground">
                            Adress
                          </Label>
                          <p className="font-bold text-base">Nhut</p>
                        </div>
                        <div className="grid gap-1">
                          <Label className="text-sm text-muted-foreground">
                            City
                          </Label>
                          <p className="font-bold text-base">Nhut</p>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm text-muted-foreground">
                            Region
                          </Label>
                          <p className="font-bold text-base">Thanh</p>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm text-muted-foreground">
                            Post code
                          </Label>
                          <p className="font-bold text-base">123456789</p>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-sm text-muted-foreground">
                            Country
                          </Label>
                          <p className="font-bold text-base">123456789</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="justify-end">
                      <Button>Edit</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
