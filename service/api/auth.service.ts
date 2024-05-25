"use server";
import { ResetPasswordData, SignInData, SignUpData } from "@/schemas/auth";
import { FetchHttpError, http } from "../http";
import { cookies } from "next/headers";
import { parseCookie } from "@/lib/cookies-parser";
import { UserRole } from "@/schemas/user";
import { revalidatePath } from "next/cache";

export type SignUpRes = {
  message: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    isBlocked: boolean;
  };
};

export async function signUp(data: SignUpData) {
  try {
    const res = await http.post<SignUpRes>("/auth/signup", data);
    return { success: true, message: res.data.message };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("signIn() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function signOut() {
  const allCookies = cookies().getAll();

  try {
    await http.delete<{ message: string }>("/auth/signout", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
    });
    cookies().delete("session");
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log("signOut() method error: ", error);
    }
  }
}

export type SignInRes = {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: UserRole;
    picture: string;
    isBlocked: boolean;
    emailVerified: boolean;
  };
};
export async function signIn(data: SignInData) {
  try {
    const res = await http.post<SignInRes>("/auth/signin", data);
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, { ...cookieParser });
    }
    return { success: true, ...res.data };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("signIn() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function recover(email: string) {
  try {
    const res = await http.patch<{ message: string }>("/auth/recover", {
      email,
    });
    return { success: true, ...res.data };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("recover() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}

export async function sendEmailVerify() {
  const allCookies = cookies().getAll();
  try {
    const res = await http.get<{ message: string }>(
      "/users/send-verify-email",
      {
        headers: {
          Cookie: allCookies
            .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
            .join("; "),
        },
      }
    );
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log("sendEmailVerify() method error: ", error);
    }
  }
}

export async function changeEmail(data: { email: string }) {
  const allCookies = cookies().getAll();
  try {
    await http.patch<{ message: string }>("/users/change-email", data, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
    });
    revalidatePath("/auth/verify-email");
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log("changeEmail() method error: ", error);
    }
  }
}

export async function resetPassword(token: string, data: ResetPasswordData) {
  try {
    const res = await http.patch<{ message: string }>(
      "/auth/reset-password/" + token,
      data
    );
    return { success: true, ...res.data };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
      return { success: false, message: error.serialize().data.message };
    } else {
      console.log("resetPassword() method error: ", error);
      return { success: false, message: "unknown" };
    }
  }
}
