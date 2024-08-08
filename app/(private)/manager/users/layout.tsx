import UserProvider from "@/components/providers/user-provider";
import React from "react";

const UserManagerLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <UserProvider>
      <div className="w-full mx-auto xl:max-w-screen-xl xl:mx-auto p-4">
        {children}
      </div>
    </UserProvider>
  );
};

export default UserManagerLayout;
