"use server";
import { ResetPasswordData, SignInData, SignUpData } from "@/schemas/auth";
import { FetchHttpError, ResData, http } from "../http";
import { cookies } from "next/headers";
import configs from "@/config";
import { parseCookie } from "@/lib/cookies-parser";

export async function senOTP(email: string) {
  try {
    const res = await http.post<ResData>("/auth/signup/send-otp", {
      email,
    });
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}

export async function signUp(data: SignUpData) {
  try {
    const res = await http.post<ResData>("/auth/signup", data);
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}

export async function signIn(data: SignInData) {
  try {
    const res = await http.post<ResData>("/auth/signin", data);
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, { ...cookieParser });
    }
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}

export async function signOut() {
  try {
    const res = await http.get<ResData>("/auth/signout");
    for (const cookie of res.headers.getSetCookie()) {
      const cookieParser = parseCookie(cookie);
      cookies().set(cookieParser.name, cookieParser.value, { ...cookieParser });
    }
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}

export async function recover(email: string) {
  try {
    const res = await http.patch<ResData>("/auth/recover", {
      email,
    });
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}

export async function resetPassword(token: string, data: ResetPasswordData) {
  try {
    const res = await http.patch<ResData>(
      "/auth/reset-password/" + token,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error instanceof FetchHttpError) {
      return {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
      };
    } else {
      console.log(error);
      return {
        statusCode: 500,
        status: "error",
        message: "unknown",
      };
    }
  }
}
