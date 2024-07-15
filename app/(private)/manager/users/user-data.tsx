"use client";
import React from "react";
import { UserPagination } from "./user-pagination";
import { UserToolBar } from "./user-toolbar";
import { UserCardView } from "./user-card";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "@/components/providers/user-provider";
import UserTableView from "./user-table";
import { searchUser } from "@/service/api/user.service";

const UserData = ({
  searchParams,
}: {
  searchParams?: {
    [index: string]: string | string[] | undefined;
  };
}) => {
  const { filter, viewMode } = useUserData();
  console.log(filter);
  const { isPending, data, isError } = useQuery({
    queryKey: ["user", searchParams?.tab, JSON.stringify(filter)],
    queryFn: async () => {
      return await searchUser({
        email: filter?.emails,
        role: filter?.roles,
        inActive: searchParams?.tab == "inactive" ? true : undefined,
        suspended: searchParams?.tab == "suspended" ? true : undefined,
        page: filter?.page,
        limit: filter?.limit,
      });
    },
  });

  return (
    <>
      <UserToolBar
        tab={
          searchParams?.tab == "inactive" || searchParams?.tab == "suspended"
            ? searchParams?.tab
            : "active"
        }
      />
      {viewMode == "card" ? (
        <UserCardView data={data?.users} />
      ) : (
        <UserTableView data={data?.users} />
      )}
      {data?.users && data?.users.length > 0 && (
        <UserPagination totalPage={data?.metadata.totalPage} />
      )}
    </>
  );
};

export default UserData;
