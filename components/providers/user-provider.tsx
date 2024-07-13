"use client";
import { Role } from "@/schemas/user";
import { useQuery } from "@tanstack/react-query";
import { omit } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserConextFilterType {
  emails?: string[];
  roles?: Role[];
  emailVerified?: boolean;
  orderBy?: UserOrderBy[];
  page?: number;
  limit?: number;
}

export interface UserOrderBy {
  email?: "asc" | "desc";
  role?: "asc" | "desc";
  emailVerified?: "asc" | "desc";
}
type ViewModeType = "card" | "list";

export interface UserConextType {
  filter?: UserConextFilterType | undefined;
  viewMode?: ViewModeType;
  setViewMode: (viewMode: ViewModeType) => void;
  setFilter(
    data?: Pick<UserConextFilterType, "emails" | "roles" | "emailVerified">
  ): void;
  setSortBy(data?: Pick<UserConextFilterType, "orderBy">): void;
  setPagination(data?: Pick<UserConextFilterType, "page" | "limit">): void;
  clearFilter: () => void;
}

const initUserContext: UserConextType = {
  filter: {
    limit: 10,
    page: 1,
  },
  viewMode: "card",
  setViewMode: (viewMode: ViewModeType) => {},
  setFilter: (
    data?: Pick<UserConextFilterType, "emails" | "roles" | "emailVerified">
  ) => {},
  setSortBy: (data?: Pick<UserConextFilterType, "orderBy">) => {},
  setPagination: (data?: Pick<UserConextFilterType, "page" | "limit">) => {},
  clearFilter: () => {},
};

const userContext = React.createContext<UserConextType>(initUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserConextType>({
    ...initUserContext,
  });

  function setViewMode(viewMode: "card" | "list") {
    setData((prev) => ({ ...prev, viewMode }));
  }

  function setFilter(
    data?: Pick<UserConextFilterType, "emails" | "roles" | "emailVerified">
  ) {
    console.log(data);
    setData((prev) => ({
      ...prev,
      filter: data
        ? { ...prev.filter, ...data }
        : omit(prev.filter, ["emails", "roles", "emailVerified"]),
    }));
  }

  function setSortBy(data?: Pick<UserConextFilterType, "orderBy">) {
    setData((prev) => ({
      ...prev,
      filter: data
        ? { ...prev.filter, ...data }
        : omit(prev.filter, ["orderBy"]),
    }));
  }

  function setPagination(data?: Pick<UserConextFilterType, "page" | "limit">) {
    setData((prev) => ({
      ...prev,
      filter: { ...prev.filter, page: 1, limit: 10, ...data },
    }));
  }

  function clearFilter() {
    setData((prev) => ({
      ...prev,
      filter: {
        limit: 10,
        page: 1,
      },
    }));
  }

  return (
    <userContext.Provider
      value={{
        ...data,
        setViewMode,
        setFilter,
        clearFilter,
        setSortBy,
        setPagination,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export function useUserData() {
  const data = useContext(userContext);
  return data;
}

export default UserProvider;
