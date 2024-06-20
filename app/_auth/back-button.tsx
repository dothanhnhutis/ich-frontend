import Link from "next/link";
import React from "react";

export const BackButton = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <div className="flex items-center justify-center space-x-1 mt-6">
      <Link prefetch href={href} className="font-normal text-sm">
        {label}
      </Link>
    </div>
  );
};
