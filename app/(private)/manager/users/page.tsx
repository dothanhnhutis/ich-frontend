import { getAllUser } from "@/service/api/user.service";
import React from "react";
import { DataTable } from "./data-table";

const UserManagerPage = async () => {
  const users = await getAllUser();
  return <DataTable />;
};

export default UserManagerPage;
