import React from "react";
import authApi from "@/service/collections/auth.collection";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const ReactivatePage = async ({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) => {
  await authApi.activateAccount(searchParams.token);

  return <div>ReactivatePage</div>;
};

export default ReactivatePage;
