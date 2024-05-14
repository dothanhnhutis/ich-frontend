import { getUserByPasswordResetToken } from "@/service/api/user.service";
import { notFound } from "next/navigation";
import React from "react";

const ResetPasswordPage = async ({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) => {
  const user = await getUserByPasswordResetToken(token);
  if (!user) return notFound();
  return <div>ResetPasswordPage</div>;
};

export default ResetPasswordPage;
