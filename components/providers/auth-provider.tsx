"use client";
import { User } from "@/schemas/user";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<{ currentUser: User | undefined }>({
  currentUser: undefined,
});

export const useAuthContext = () => useContext(authContext);

export const AuthProvider = ({
  initUser,
  children,
}: {
  initUser?: User;
  children: React.ReactNode;
}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(initUser);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
