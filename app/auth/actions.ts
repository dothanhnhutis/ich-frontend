"use server";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";
import { ResetPasswordInput, SignInInput, SignUpInput } from "@/schemas/auth";
import { cookieParser } from "@/lib/cookies-parser";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookieServer } from "../actions";

export async function emailCheck(input: Pick<SignInInput, "email">) {
  const { success } = await authApi.signIn(input);
  return success;
}

export async function signIn(input: SignInInput | Pick<SignInInput, "email">) {
  const res = await authApi.signIn(input);
  if (res.success) {
    cookies().delete("registered");

    for (const cookie of res.headers.getSetCookie()) {
      const parser = cookieParser(cookie);
      if (parser) {
        const { name, value, ...opt } = parser;
        cookies().set(name, value, opt);
      }
    }
    revalidatePath("/auth/signin");
    redirect("/account/profile");
  }
  return res;
}

export async function clearSendEmail() {
  cookies().delete("send-email");
}

export async function clearEmailRegistered() {
  cookies().delete("registered");
}

export async function reActivateAccount(email: string) {
  await authApi.reActivateAccount(email);
  cookies().set("send-email", "true");
  redirect("/auth/send-email");
}

export async function signUp(input: SignUpInput) {
  const { success, data } = await authApi.signUp(input);
  return { success, message: data.message };
}

export async function sendEmailVerify() {
  await userApi.sendEmailVerify(await cookieServer());
}

export async function changeEmail(email: string) {
  const { data, success } = await userApi.changeEmail(await cookieServer(), {
    email,
  });
  return { message: data.message, success };
}

export async function resetPassword(token: string, input: ResetPasswordInput) {
  const { success, data } = await authApi.resetPassword(token, input);
  return { success, message: data.message };
}

export async function activateAccount(token: string) {
  await authApi.activateAccount(token);
}

export async function verifyEmail(token: string) {
  await authApi.verifyEmail(token);
  revalidatePath("/auth/confirm-email");
}
