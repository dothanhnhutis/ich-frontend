import React from "react";
import Navigation from "./sider-bar";
import UserSiderBar from "./sider-bar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sm:flex sm:flex-grow block">
      <UserSiderBar />
      <div className="w-full mx-auto sm:max-w-screen-xl p-4">{children}</div>
    </div>
  );
};

export default UserLayout;
