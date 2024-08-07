"use server";
import {
  CreateUserInput,
  User,
  EditPassword,
  Role,
  EditUserInput,
} from "@/schemas/user";
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
    const res = await http.get<User>("/users/me", {
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

export async function editProfile(data: Partial<User>) {
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

export type SearchUserRes = {
  id: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  inActive: boolean;
  username: string;
  suspended: boolean;
  phone: string | null;
  picture: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  linkProvider: {
    provider: "google" | "credential";
  }[];
};

export type SearchUserInput = {
  email?: string[] | undefined;
  role?: Role[] | undefined;
  emailVerified?: boolean | undefined;
  inActive?: boolean | undefined;
  suspended?: boolean | undefined;
  orderBy?:
    | (
        | "email.asc"
        | "email.desc"
        | "role.asc"
        | "role.desc"
        | "emailVerified.asc"
        | "emailVerified.desc"
      )[]
    | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export async function searchUser(props?: SearchUserInput) {
  const allCookies = cookies().getAll();
  let searchParams = "";
  if (props) {
    searchParams =
      "?" +
      Object.entries(props)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}=${value.join(",")}`;
          } else {
            return `${key}=${value}`;
          }
        })
        .join("&");
  }
  try {
    const res = await http.get<{
      users: SearchUserRes[];
      metadata: { hasNextPage: boolean; totalPage: number; totalItem: number };
    }>(`/users/_search${searchParams}`, {
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
        "searchUser() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("searchUser() method error: ", error);
    }
    return {
      users: [],
      metadata: {
        hasNextPage: false,
        totalPage: 1,
      },
    };
  }
}

export const createUser = async (data: CreateUserInput) => {
  try {
    const allCookies = cookies().getAll();
    const res = await http.post<{ message: string }>("/users", data, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    revalidatePath("/manager/users");
    return { success: true, message: res.data.message };
  } catch (error: any) {
    const result = { success: false, message: "unknown" };
    if (error instanceof FetchHttpError) {
      return { success: false, message: error.serialize().data.message };
    }
    console.log("createUser() method error: ", result.message);
    return result;
  }
};

export async function getUserById(id: string) {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<User>("/users/" + id, {
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
        "getUserById() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("getUserById() method error: ", error);
    }
    return undefined;
  }
}

export async function editUserById(data: EditUserInput) {
  const allCookies = cookies().getAll();
  try {
    const res = await http.post<{ message: string }>("/users/", data, {
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
