import { verifyEmail } from "@/service/api/auth.service";
import React from "react";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
const ConfirmEmailPage = async ({
  searchParams,
}: {
  searchParams: {
    v_token: string;
  };
}) => {
  await verifyEmail(searchParams.v_token);
  return <div>ConfirmEmail</div>;
};

export default ConfirmEmailPage;
