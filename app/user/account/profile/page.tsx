"use client";
import { useAuthContext } from "@/components/providers/auth-provider";
import React from "react";

const UserProfile = () => {
  const currentUser = useAuthContext();
  console.log(currentUser);
  return <div>UserProfile</div>;
};

export default UserProfile;
