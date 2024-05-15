"use server";
import { FetchHttpError, ResData, http } from "../http";
import { cookies } from "next/headers";

export async function getUserByPasswordResetToken(token: string) {
  try {
    const res = await http.get<ResData>("/users/token/" + token);
    return res.data;
  } catch (error: any) {
    return null;
  }
}

export async function getCurrentUser(): Promise<ResData> {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<ResData>("/users/me", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}
