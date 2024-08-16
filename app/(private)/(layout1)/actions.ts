"use server";
import userApi from "@/service/collections/user-collections";
import { cookieServer } from "@/app/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

export async function sendEmailVerify() {
  console.log(await cookieServer());
  await userApi.sendEmailVerify(await cookieServer());
}

export async function changeEmail(email: string) {
  const { data, success } = await userApi.changeEmail(await cookieServer(), {
    email,
  });
  return { message: data.message, success };
}

export async function disactivateAccount(path?: string) {
  const { success } = await userApi.disactivateAccount(await cookieServer());
  if (success) {
    cookies().delete("session");
    if (path) revalidatePath(path);
    redirect(DEFAULT_LOGOUT_REDIRECT);
  }
}
