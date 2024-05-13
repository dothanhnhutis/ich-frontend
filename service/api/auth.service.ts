"use server";
import { SignUpForm } from "@/schemas/auth";
import { FetchHttpError, http } from "../http";

type ResData = {
  statusCode: number;
  status: string;
  message: string;
  metadata?: any;
};

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
