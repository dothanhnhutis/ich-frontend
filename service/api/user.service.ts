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
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log(error);
    }
    return undefined;
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
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(
        "getCurrentUser() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("getCurrentUser() method error: ", error);
    }
    return undefined;
  }
}

export async function diableAuthUser() {
  const allCookies = cookies().getAll();
  console.log(
    allCookies.map((c) => `${c.name}=${encodeURIComponent(c.value)}`).join("; ")
  );
  try {
    const res = await http.patch<{ message: string }>("/users/disable", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });

    cookies().delete("session");
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(
        "diableAuthUser() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("diableAuthUser() method error: ", error);
    }
    return undefined;
  }
}
