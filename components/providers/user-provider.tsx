"use client";
import { Role } from "@/schemas/user";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserConextFilterType {
  emails?: string[];
  roles?: Role[];
  verified?: boolean;
  orderBy?: {
    email?: "asc" | "desc";
    role?: "asc" | "desc";
    emailVerified?: "asc" | "desc";
  }[];
  page?: number;
  limit?: number;
}
type ViewModeType = "card" | "list";

export interface UserConextType {
  filter?: UserConextFilterType | undefined;
  viewMode?: ViewModeType;
  setViewMode: (viewMode: ViewModeType) => void;
  setFilter: (filter: UserConextFilterType) => void;
  clearFilter: () => void;
}

const initUserContext: UserConextType = {
  filter: {
    roles: ["CUSTOMER", "MANAGER"],
    limit: 10,
    page: 1,
  },
  viewMode: "card",
  setViewMode: (viewMode: ViewModeType) => {},
  setFilter: (filter: UserConextFilterType) => {},
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

  function setFilter(filter: UserConextFilterType) {
    setData((prev) => ({ ...prev, filter }));
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
      value={{ ...data, setViewMode, setFilter, clearFilter }}
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
