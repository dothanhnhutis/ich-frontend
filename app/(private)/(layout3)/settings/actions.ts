"use server";
import userApi from "@/service/collections/user-collections";
import {
  CreatePasswordInput,
  EditPasswordInput,
  EditPictureInput,
  EditProfileInput,
} from "@/schemas/user";
import { cookieServer } from "@/app/actions";

export async function editProfile(input: EditProfileInput) {
  const { success, data } = await userApi.editProfile(
    await cookieServer(),
    input
  );
  return { success, message: data.message };
}

export async function editPicture(input: EditPictureInput) {
  const { success, data } = await userApi.editPicture(
    await cookieServer(),
    input
  );
  return { success, message: data.message };
}

export async function editPassword(input: EditPasswordInput) {
  const { success, data } = await userApi.editPassword(
    await cookieServer(),
    input
  );
  return { success, message: data.message };
}

export async function createPassword(input: string) {
  const { success, data } = await userApi.createPassword(
    await cookieServer(),
    input
  );
  return { success, message: data.message };
}

export async function setMFA(deviceName: string) {
  const { success, data } = await userApi.setupMFA(
    await cookieServer(),
    deviceName
  );
  console.log(data);
  if (success) {
    return { success, message: data.message, data: data.data };
  } else {
    return { success, message: data.message };
  }
}
