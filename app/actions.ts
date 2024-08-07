"use server";
import { cookies } from "next/headers";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";

export async function cookieServer() {
  return cookies()
    .getAll()
    .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
    .join("; ");
}

export async function getCurrentUser() {
  const { success, data } = await userApi.currentUser(await cookieServer());
  return success ? data : undefined;
}

export async function recover(email: string) {
  const { success, data } = await authApi.recover(email);
  return { success, message: data.message };
}
