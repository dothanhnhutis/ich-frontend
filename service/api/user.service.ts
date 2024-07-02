"use server";
import { CurrentUser, EditPassword } from "@/schemas/user";
import { FetchHttpError, http } from "../http";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type PasswordResetTokenRes = {
  id: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
};

export async function getUserByPasswordResetToken(token: string) {
  try {
    const res = await http.get<PasswordResetTokenRes>("/users/" + token);
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

export async function disactivateAccount() {
  const allCookies = cookies().getAll();

  try {
    await http.patch<{ message: string }>(
      "/users/disactivate",
      {},
      {
        headers: {
          Cookie: allCookies
            .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
            .join("; "),
        },
      }
    );
    cookies().delete("session");
    return true;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(
        "disactivateAccount() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("disactivateAccount() method error: ", error);
    }
    return false;
  }
}

export async function editProfile(data: Partial<CurrentUser>) {
  const allCookies = cookies().getAll();
  try {
    const res = await http.patch<{ message: string }>("/users", data, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    revalidatePath("/user/profile");
    return { success: true, ...res.data };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("editProfile() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function editPassword(data: EditPassword) {
  const allCookies = cookies().getAll();
  try {
    const res = await http.post<{ message: string }>("/users/password", data, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    revalidatePath("/user/profile");
    return { success: true, message: res.data.message };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("editPassword() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function editPicture(data: {
  pictureType: "url" | "base64";
  pictureData: string;
}) {
  const allCookies = cookies().getAll();
  try {
    const res = await http.post<{ message: string }>("/users/picture", data, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    revalidatePath("/user/profile");
    return { success: true, message: res.data.message };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("editPicture() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function getAllUser() {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<any>("/users", {
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
        "getAllUser() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("getAllUser() method error: ", error);
    }
    return [];
  }
}

export async function getUsersTest(props: { page?: number; take?: number }) {
  const allCookies = cookies().getAll();
  console.log(props);
  console.log(
    Object.keys(props)
      .map((key) => key + "=" + props[key as keyof typeof props])
      .join("&")
  );
  try {
    const res = await http.get<any>("/users/test", {
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
        "getAllUser() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("getAllUser() method error: ", error);
    }
    return [];
  }
}
