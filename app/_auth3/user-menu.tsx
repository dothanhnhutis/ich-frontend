"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOutIcon, MailIcon, SettingsIcon } from "lucide-react";
import { signOut } from "@/service/api/auth.service";
import { useRouter, usePathname } from "next/navigation";
import { disactivateAccount } from "@/service/api/user.service";
import { privateRegExpRoutes } from "@/routes";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useQueryClient } from "@tanstack/react-query";

const UserMenu = () => {
  const { currentUser } = useAuthContext();
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const isPrivateRoute = useMemo(() => {
    return privateRegExpRoutes.some((routes) => routes.test(pathname));
  }, [pathname]);

  if (isPrivateRoute)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={currentUser?.picture ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[360px]">
          <DropdownMenuLabel className="flex items-center gap-3">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser?.picture ?? AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <div className="w-full overflow-hidden">
              <p className="font-medium text-lg">
                {currentUser?.username ?? "error"}
              </p>
              <p className="text-muted-foreground font-normal">
                {currentUser?.role ?? "error"}
              </p>
              <div className="flex items-center space-x-2 text-muted-foreground w-full">
                <MailIcon size={16} />
                <p className="text-sm truncate">
                  {currentUser?.email ?? `error`}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/account/profile" className="cursor-pointer">
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings" className="cursor-pointer">
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              signOut();
              router.push("/login");
              queryClient.clear();
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <div className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={currentUser?.picture ?? AvatarDefault.src} />
            <AvatarFallback className="bg-transparent">
              <Skeleton className="h-10 w-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          avoidCollisions
          align="end"
          className="w-[245px] hidden sm:block"
        >
          <DropdownMenuLabel className="flex flex-col items-center">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser?.picture ?? AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <p className="font-medium text-lg">{currentUser?.username}</p>
            <p className="text-muted-foreground font-sm">{currentUser?.role}</p>
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <SettingsIcon className="mr-4 h-4 w-4" />
            <span>Close Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              signOut();
              router.refresh();
              queryClient.clear();
            }}
          >
            <LogOutIcon className="mr-4 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will deactivate your account
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (await disactivateAccount()) {
                  router.push("/login");
                }
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserMenu;
