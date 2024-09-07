"use client";
import React from "react";
import NavLink from "../../nav-link";

const UserManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background p-4 max-w-screen-2xl mx-auto md:rounded-xl mb-2">
      <h3 className="font-bold text-4xl">User Management</h3>
      <p className="text-sm font-normal leading-snug text-muted-foreground">
        Manage your user and their account permissions here.
      </p>
      {children}
    </div>
  );
};

export default UserManageLayout;
