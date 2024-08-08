"use server";
import {
  CreateUserInput,
  EditUserInput,
  SearchUserInput,
} from "@/schemas/user";
import userApi from "@/service/collections/user-collections";
import { cookieServer } from "@/app/actions";
import { revalidatePath } from "next/cache";

export async function searchUser(input?: SearchUserInput) {
  const { success, data } = await userApi.searchUser(
    await cookieServer(),
    input
  );
  return success
    ? data
    : {
        users: [],
        metadata: {
          hasNextPage: false,
          totalPage: 1,
        },
      };
}

export async function createUser(input: CreateUserInput) {
  const { success, data } = await userApi.createUser(
    await cookieServer(),
    input
  );
  return { success, message: data.message };
}

export async function getUserById(id: string) {
  const { success, data } = await userApi.getUserById(await cookieServer(), id);
  return success ? data : undefined;
}

export async function editUserById(id: string, input: EditUserInput) {
  const { success, data } = await userApi.editUserById(
    await cookieServer(),
    id,
    input
  );
  if (success) {
    revalidatePath(`/manager/users/${id}/edit`);
  }
  return { success, message: data.message };
}
