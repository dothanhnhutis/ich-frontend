"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DarkMode({
  className,
  type = "switch",
}: {
  className?: string;
  type?: "switch" | "btn";
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return <></>;

  const { setTheme, theme } = useTheme();
  if (type == "switch")
    return (
      <button
        className={cn(
          "relative bg-input ease-in-out  block flex-shrink-0 rounded-full w-10 h-[22px] border border-muted-foreground hover:border-primary",
          className
        )}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        <span className="absolute top-[1px] left-[1px] size-[18px] rounded-full transition-all duration-300 ease-in-out bg-background dark:translate-x-full dark:bg-black">
          <span className="size-[18px] relative block rounded-full overflow-hidden">
            {theme === "dark" ? (
              <MoonIcon className="size-3 absolute top-[3px] left-[3px] text-muted-foreground dark:text-white" />
            ) : (
              <SunIcon className="size-3 absolute top-[3px] left-[3px] text-muted-foreground dark:text-white" />
            )}
          </span>
        </span>
      </button>
    );
  return (
    <button
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <MoonIcon className="block flex-shrink-0 size-6 sm:mr-2" />
      ) : (
        <SunIcon className="block flex-shrink-0 size-6 sm:mr-2" />
      )}
    </button>
  );
}
