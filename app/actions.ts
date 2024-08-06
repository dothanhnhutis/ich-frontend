"use server";
import { cookies } from "next/headers";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";

export async function getCurrentUser() {
  const allCookies = cookies().getAll();
  const cookie = allCookies
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
  const { success, data } = await userApi.currentUser(cookie);
  return success ? data : undefined;
}

export async function recover(email: string) {
  const { success, data } = await authApi.recover(email);
  return { success, message: data.message };
}
