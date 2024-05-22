"use server";
import { ResetPasswordData, SignInData, SignUpData } from "@/schemas/auth";
import { FetchHttpError, http } from "../http";
import { cookies } from "next/headers";
import { parseCookie } from "@/lib/cookies-parser";
import { UserRole } from "@/schemas/user";

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
    return res;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
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
    return res;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}

export async function signOut() {
  try {
    const res = await http.get<any>("/auth/signout");
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, { ...cookieParser });
    }
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}

export async function recover(email: string) {
  try {
    const res = await http.patch<any>("/auth/recover", {
      email,
    });
    return res;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}

export async function resetPassword(token: string, data: ResetPasswordData) {
  try {
    const res = await http.patch<any>("/auth/reset-password/" + token, data);
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return error.serialize();
    } else {
      console.log(error);
      return {
        statusCode: 500,
        headers: error.headers,
        data: { message: "unknown" },
      };
    }
  }
}
