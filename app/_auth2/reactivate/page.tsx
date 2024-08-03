import { activateAccount } from "@/service/api/auth.service";
import React from "react";

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
  await activateAccount(searchParams.token);

  return <div>ReactivatePage</div>;
};

export default ReactivatePage;
