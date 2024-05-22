"use client";
import { CurrentUser } from "@/schemas/user";
import { getCurrentUser } from "@/service/api/user.service";
import { createContext, useContext, useEffect, useState } from "react";

const initAuth: CurrentUser = {
  id: "error",
  email: "error",
  isBlocked: true,
  picture: null,
  role: "CUSTOMER",
  username: "error",
};

const authContext = createContext<{ currentUser: CurrentUser }>({
  currentUser: initAuth,
});

export const useAuthContext = () => {
  const { currentUser } = useContext(authContext);
  return currentUser;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(initAuth);

  useEffect(() => {
    const fetchUserCurrent = async () => {
      const res = await getCurrentUser();
      if (res.statusCode == 200) setCurrentUser(res.data as CurrentUser);
    };
    fetchUserCurrent();
  }, []);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
