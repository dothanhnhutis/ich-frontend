"use server";
import { ResetPasswordData, SignInData, SignUpData } from "@/schemas/auth";
import { FetchHttpError, http } from "../http";
import { cookies } from "next/headers";
import { parseCookie } from "@/lib/cookies-parser";
import { revalidatePath } from "next/cache";

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
  success: boolean;
  reactivateAccount?: true;
  model: "password" | "email";
  message?: string;
};

export async function signIn(data: SignInData): Promise<SignInRes> {
  let resData: SignInRes = {
    success: false,
    model: "password",
  };
  try {
    const res = await http.post<SignInRes>("/auth/signin", data);
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, {
        ...cookieParser,
      });
    }
    resData.success = true;
    resData.message = res.data.message;
    return resData;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      resData.message = error.serialize().data.message;
      return resData;
    } else {
      console.log("signIn() method error: ", error);
      resData.message = "unknown";
      return resData;
    }
  }
}

export async function checkActiveAccount(
  data: Pick<SignInData, "email">
): Promise<SignInRes> {
  let resData: SignInRes = {
    success: false,
    model: "password",
  };
  try {
    const res = await http.post<{ message: string }>("/auth/check/email", {
      email: data.email,
    });
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, {
        ...cookieParser,
      });
    }
    resData.model = "email";
    resData.reactivateAccount = true;
    return resData;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return resData;
    } else {
      console.log("signIn() method error: ", error);
      resData.message = "unknown";
      return resData;
    }
  }
}

export async function sendReactivateAccount() {
  try {
    const allCookies = cookies().getAll();
    await http.get("/auth/reactivate", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
    cookies().delete("eid");
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(
        "sendReactivateAccount() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("sendReactivateAccount() method error: ", error);
    }
  }
}

export async function activateAccount(token: string) {
  try {
    const allCookies = cookies().getAll();
    await http.get<{}>("/auth/reactivate/" + token, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
      credentials: "include",
    });
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(
        "sendReactivateAccount() method error: ",
        error.serialize().data.message
      );
    } else {
      console.log("sendReactivateAccount() method error: ", error);
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
    return true;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log("changeEmail() method error: ", error);
    }
    return false;
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

export async function verifyEmail(token: string) {
  try {
    await http.get<{ message: string }>(`/auth/confirm-email/${token}`);
    revalidatePath("/auth/confirm-email");
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      console.log(error.serialize());
    } else {
      console.log("verifyEmail() method error: ", error);
    }
  }
}

type SignUpRes = {
  success: boolean;
  message: string;
};

export async function signup(data: SignUpData): Promise<SignUpRes> {
  try {
    const res = await http.post<Pick<SignUpRes, "message">>(
      "/auth/signup",
      data
    );
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, {
        ...cookieParser,
      });
    }
    return {
      success: true,
      message: res.data.message,
    };
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        success: false,
        message: error.serialize().data.message,
      };
    } else {
      return {
        success: false,
        message: "unknown",
      };
    }
  }
}
