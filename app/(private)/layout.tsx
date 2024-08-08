import React from "react";
import UserHeader from "./header";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted/40 relative">
      <UserHeader />
      {children}
    </div>
  );
};

export default PrivateLayout;
