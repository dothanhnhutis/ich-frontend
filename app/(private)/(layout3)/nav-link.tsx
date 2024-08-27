"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NavLink = ({
  href = "#",
  regex,
  title = "",
  Icon,
  className,
}: {
  href?: string;
  regex?: RegExp;
  title?: string;
  Icon?: LucideIcon;
  className?: string;
}) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center p-2 rounded-lg mb-1 last:mb-0",
        regex?.test(path)
          ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          : "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {Icon && <Icon className="block flex-shrink-0 size-6 md:mr-2" />}
      <span className="text-sm hidden md:inline">{title}</span>
    </Link>
  );
};

export default NavLink;
