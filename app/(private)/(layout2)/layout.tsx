import React from "react";
import UserHeader from "./header";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <UserHeader />
      {children}
    </div>
  );
};

export default ManageLayout;
