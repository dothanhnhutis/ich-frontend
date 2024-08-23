import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AvatarDefault from "@/images/avatars/user-1.jpg";
import Image from "next/image";
import LogoImg from "@/images/logos/logo.png";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background h-full border rounded-xl p-4">
      <h3 className="font-bold text-2xl">Account settings</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
      <div className="flex flex-col mt-4 gap-4">
        <div className="flex gap-2 items-center overflow-x-scroll">
          <Button variant="secondary">General</Button>
          <Button variant="ghost">Security</Button>
          <Button variant="ghost">Notifications</Button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SettingLayout;
