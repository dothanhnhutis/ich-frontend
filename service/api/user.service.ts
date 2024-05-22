"use server";
import { CurrentUser } from "@/schemas/user";
import { FetchHttpError, http } from "../http";
import { cookies } from "next/headers";

export type PasswordResetTokenRes = {
  id: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
};

export async function getUserByPasswordResetToken(token: string) {
  try {
    const res = await http.get<PasswordResetTokenRes>("/users/token/" + token);
    return res;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}

export async function getCurrentUser() {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<CurrentUser>("/users/me", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    return res;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}
