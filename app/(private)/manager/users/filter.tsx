import Link from "next/link";
import React from "react";

export const FilterUser = () => {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-4">
        <Link href="/manager/users?orderBy=email.asc">Active</Link>
        <Link href="/manager/users?orderBy=email.asc&inactive=1">InActive</Link>
        <Link href="/manager/users?orderBy=email.asc&suspended=1">
          Suspended
        </Link>
      </div>
    </div>
  );
};
