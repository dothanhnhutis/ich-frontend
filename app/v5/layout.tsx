import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const V2Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative md:flex md:overflow-hidden">
      <Sidebar />
      <div className="w-full md:max-h-screen md:overflow-x-hidden md:overflow-y-scroll">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default V2Layout;
