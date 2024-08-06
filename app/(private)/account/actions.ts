"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import userApi from "@/service/collections/user-collections";
import {
  EditPassword,
  EditPictureInput,
  EditProfileInput,
} from "@/schemas/user";
import { redirect } from "next/navigation";

const cookieServer = cookies()
  .getAll()
  .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
  .join("; ");

export async function editProfile(input: EditProfileInput) {
  const { success, data } = await userApi.editProfile(cookieServer, input);
  // if (success) {
  //   revalidatePath("/account/profile");
  // }
  return { success, message: data.message };
}

export async function editPicture(input: EditPictureInput) {
  const { success, data } = await userApi.editPicture(cookieServer, input);
  // if (success) {
  //   revalidatePath("/account/profile");
  // }
  return { success, message: data.message };
}

export async function disactivateAccount() {
  const { success } = await userApi.disactivateAccount(cookieServer);
  if (success) {
    cookies().delete("session");
    redirect("/auth/signin");
  }
}

export async function editPassword(input: EditPassword) {
  const { success, data } = await userApi.editPassword(cookieServer, input);
  if (success) {
    revalidatePath("/account/password-and-security");
  }
  return { success, message: data.message };
}

export async function createPassword(input: Omit<EditPassword, "oldPassword">) {
  const { success, data } = await userApi.createPassword(cookieServer, input);
  if (success) {
    revalidatePath("/account/password-and-security");
  }
  return { success, message: data.message };
}
