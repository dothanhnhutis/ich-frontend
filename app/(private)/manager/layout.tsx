import React from "react";
import { ManagerSiderBar } from "./sider-bar";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow">
      <ManagerSiderBar />
      {children}
    </div>
  );
};

export default UserLayout;
