"use server";

import { SignUpInput } from "@/schemas/auth";
import userApi from "@/service/collections/user-collections";
import authApi from "@/service/collections/auth.collection";

export async function signUp(input: SignUpInput) {
  const { success, data } = await authApi.signUp(input);
  return { success, message: data.message };
}
