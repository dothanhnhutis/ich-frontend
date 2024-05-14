"use server";
import { ResetPasswordForm, SignInForm, SignUpForm } from "@/schemas/auth";
import { FetchHttpError, ResData, http } from "../http";
import { cookies } from "next/headers";

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

export async function signUp(data: SignUpForm) {
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

export async function signIn(data: SignInForm) {
  try {
    const res = await http.post<ResData>("/auth/signin", data);
    console.log(res.headers);
    cookies().set("name", "value", {
      expires: Date.now() + 24 * 60 * 60 * 1000,
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

export async function resetPassword(token: string, data: ResetPasswordForm) {
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
