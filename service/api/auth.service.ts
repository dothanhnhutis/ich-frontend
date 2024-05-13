"use server";
import { FetchHttpError, http } from "../http";

type ResSuccess = {
  statusCode: number;
  status: string;
  message: string;
  metadata?: string;
};

export async function senOTP(email: string) {
  try {
    const res = await http.post<ResSuccess>("/auth/signup/send-otp", {
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
