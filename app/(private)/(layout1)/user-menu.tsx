import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { privateRegExpRoutes } from "@/routes";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import { User } from "@/schemas/user";
import { LogOutIcon, SettingsIcon } from "lucide-react";
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

const UserMenu = ({ currentUser }: { currentUser: User }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState<boolean>(false);
  const isPrivateRoute = React.useMemo(() => {
    return privateRegExpRoutes.some((routes) => routes.test(pathname));
  }, [pathname]);
  const queryClient = useQueryClient();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <Avatar>
            <AvatarImage src={currentUser.picture ?? AvatarDefault.src} />
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
              <AvatarImage src={currentUser.picture ?? AvatarDefault.src} />
              <AvatarFallback className="bg-transparent">
                <Skeleton className="w-24 h-24 rounded-full" />
              </AvatarFallback>
            </Avatar>
            <p className="font-medium text-lg">{currentUser.username}</p>
            <p className="text-muted-foreground font-sm">{currentUser.role}</p>
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
              //   signOut();
              router.refresh();
              queryClient.removeQueries({ type: "all" });
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
                // if (await disactivateAccount()) {
                //   router.push("/login");
                // }
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
