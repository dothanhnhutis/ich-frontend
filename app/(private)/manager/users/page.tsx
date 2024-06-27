import { getAllUser, getCurrentUser } from "@/service/api/user.service";
import React from "react";
import { DataTable } from "./data-table";

const UserManagerPage = async () => {
  const currentUser = await getCurrentUser();

  return <DataTable currentUser={currentUser} />;
};

export default UserManagerPage;
