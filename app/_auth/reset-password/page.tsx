import { getUserByPasswordResetToken } from "@/service/api/user.service";
import { notFound } from "next/navigation";
import React from "react";
import ResetPasswordForm from "./reset-password-form";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const ResetPasswordPage = async ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  const user = await getUserByPasswordResetToken(token);
  if (!user) return notFound();
  return <ResetPasswordForm token={token} />;
};

export default ResetPasswordPage;
