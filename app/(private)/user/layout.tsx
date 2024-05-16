import React from "react";
import Navigation from "./navigation";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:flex space-y-4 p-4 lg:gap-4">
      <Navigation />
      <div className="lg:mx-auto lg:max-w-screen-lg w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
