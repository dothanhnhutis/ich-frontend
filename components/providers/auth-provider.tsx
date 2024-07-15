"use client";
import { User } from "@/schemas/user";
import { getCurrentUser } from "@/service/api/user.service";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext<{ currentUser: User | undefined }>({
  currentUser: undefined,
});

export const useAuthContext = () => {
  const { currentUser } = useContext(authContext);
  return currentUser;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchUserCurrent = async () => {
      const currentUser = await getCurrentUser();
      setCurrentUser(currentUser);
    };
    fetchUserCurrent();
  }, []);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
