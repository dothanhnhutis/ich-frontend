import React from "react";
import authApi from "@/service/collections/auth.collection";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const ConfirmEmailPage = async ({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) => {
  await authApi.verifyEmail(searchParams.token);
  return <div>ConfirmEmail</div>;
};

export default ConfirmEmailPage;
