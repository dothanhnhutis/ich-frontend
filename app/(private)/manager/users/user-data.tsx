"use client";
import React from "react";
import { UserPagination } from "./user-pagination";
import { UserToolBar } from "./user-toolbar";
import { UserCardView } from "./user-card";
import { useQuery } from "@tanstack/react-query";
import { useUserData } from "@/components/providers/user-provider";
import UserTableView from "./user-table";
import { searchUser } from "./actions";
import { Loading } from "@/components/loading";
import { SearchUserInput } from "@/schemas/user";

const UserData = ({
  searchParams,
}: {
  searchParams?: {
    [index: string]: string | string[] | undefined;
  };
}) => {
  const { filter, viewMode } = useUserData();

  const { isPending, data } = useQuery({
    queryKey: ["user", searchParams?.tab, filter],
    queryFn: async () => {
      const query: SearchUserInput = {
        email: filter?.emails,
        role: filter?.roles,
        page: filter?.page,
        limit: filter?.limit,
      };

      return await searchUser({
        email: filter?.emails,
        role: filter?.roles,
        disabled: searchParams?.tab == "disabled" ? true : false,
        suspended: searchParams?.tab == "suspended" ? true : false,
        page: filter?.page,
        limit: filter?.limit,
      });
    },
  });

  return (
    <>
      <UserToolBar
        tab={
          searchParams?.tab == "disabled" || searchParams?.tab == "suspended"
            ? searchParams?.tab
            : "active"
        }
      />
      {isPending && <Loading />}
      {!isPending &&
        (viewMode == "card" ? (
          <UserCardView data={data?.users} />
        ) : (
          <UserTableView data={data?.users} />
        ))}

      {!isPending && data?.users && data?.users.length > 0 && (
        <UserPagination totalPage={data?.metadata.totalPage} />
      )}
    </>
  );
};

export default UserData;
