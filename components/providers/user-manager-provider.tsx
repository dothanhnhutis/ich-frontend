"use client";
import { User } from "@/schemas/user";
import { omit } from "lodash";
import React, { useContext, useState } from "react";

export interface UserFilterType {
  emails?: string[];
  roles?: User["role"][];
  emailVerified?: boolean;
}

export interface UserOrderBy {
  email?: "asc" | "desc";
  role?: "asc" | "desc";
  emailVerified?: "asc" | "desc";
}
type ViewType = "grid" | "list";

type UserPaginationType = {
  limit: number;
  page: number;
};

export interface UserConextType {
  pagination: UserPaginationType;
  setPagination(data: Partial<UserPaginationType>): void;

  view: ViewType;
  toggleView: () => void;

  filter: UserFilterType | undefined;
  setFilter(data: UserFilterType): void;

  sort: {};
  setSortBy(data: UserOrderBy): void;

  clearFilter: () => void;
}

const initUserContext: UserConextType = {
  pagination: {
    limit: 10,
    page: 1,
  },
  setPagination: (data: Partial<UserPaginationType>) => {},

  view: "grid",
  toggleView: () => {},

  filter: {
    emails: ["gaconght@gmail.com"],
    emailVerified: true,
    roles: ["Saler", "Customer"],
  },
  setFilter: (data: UserFilterType) => {},

  sort: {},
  setSortBy: (data: UserOrderBy) => {},

  clearFilter: () => {},
};

const userContext = React.createContext<UserConextType>(initUserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserConextType>({
    ...initUserContext,
  });

  function toggleView() {
    setData((prev) => ({
      ...prev,
      view: prev.view == "grid" ? "list" : "grid",
    }));
  }

  function setFilter(data: UserFilterType) {
    setData((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        ...data,
      },
    }));
  }

  function setSortBy(data: UserOrderBy) {
    setData((prev) => ({
      ...prev,
      sort: {
        ...prev.sort,
        ...data,
      },
    }));
  }

  function setPagination(data: Partial<UserPaginationType>) {
    setData((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        ...data,
      },
    }));
  }

  // function clearFilter() {
  //   setData((prev) => ({
  //     ...prev,
  //     filter: {
  //       limit: 10,
  //       page: 1,
  //     },
  //   }));
  // }

  return (
    <userContext.Provider
      value={{ ...data, toggleView, setPagination, setFilter, setSortBy }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUserData = () => useContext(userContext);

export default UserProvider;
