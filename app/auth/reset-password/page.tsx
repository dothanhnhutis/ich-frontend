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
  return (
    <div className="flex flex-col flex-grow mx-auto w-full sm:max-w-[570px] p-4 transition-all">
      <div className="flex flex-col flex-grow space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center mt-4">
          <span>Reset your password account</span>
        </h1>

        {user ? (
          <>
            <p className="text-sm text-muted-foreground text-center">
              Fill out all fields below to reset your password account
            </p>
            <ResetPasswordForm token={token} />
          </>
        ) : (
          <p className="text-sm text-red-500 text-center">
            Your change password token has expired
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
