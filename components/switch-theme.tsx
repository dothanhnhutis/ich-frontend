"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SwitchTheme() {
  const { setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
        <Button variant="ghost" size="icon" className="outline-none">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DarkMode({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setTheme, theme } = useTheme();
  const handleClick = () =>
    theme == "dark" ? setTheme("light") : setTheme("dark");
  return (
    <button
      className={cn(
        "relative bg-input block flex-shrink-0 rounded-full w-10 h-[22px] border border-muted-foreground hover:border-primary",
        className
      )}
      {...props}
      onClick={onClick || handleClick}
    >
      <span
        className={cn(
          "absolute top-[1px] left-[1px] size-[18px] rounded-full transition-all duration-250 ease-in-out",
          theme == "dark" ? "translate-x-full bg-black" : "bg-background"
        )}
      >
        <span className="size-[18px] relative block rounded-full overflow-hidden ">
          {theme == "dark" ? (
            <MoonIcon className="size-3 absolute top-[3px] left-[3px] text-white" />
          ) : (
            <SunIcon className="size-3 absolute top-[3px] left-[3px] text-muted-foreground" />
          )}
        </span>
      </span>
    </button>
  );
}
