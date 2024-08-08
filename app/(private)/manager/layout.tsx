import React from "react";
import { ManagerSiderBar } from "./sider-bar";
import { getCurrentUser } from "@/service/api/user.service";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-grow">
      <ManagerSiderBar currentUser={currentUser} />
      {children}
    </div>
  );
};

export default UserLayout;
