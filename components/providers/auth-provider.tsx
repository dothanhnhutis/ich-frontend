"use client";
import { CurrentUser } from "@/schemas/user";
import { getCurrentUser } from "@/service/api/user.service";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<{ currentUser?: CurrentUser | undefined }>({
  currentUser: undefined,
});

export const useAuthContext = () => {
  const { currentUser } = useContext(authContext);
  return currentUser;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();

  useEffect(() => {
    const fetchUserCurrent = async () => {
      const res = await getCurrentUser();
      setCurrentUser(res.metadata.user);
    };
    fetchUserCurrent();
  }, []);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
