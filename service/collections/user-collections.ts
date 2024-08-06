"use server";

import { cookies } from "next/headers";
import { FetchHttp, FetchHttpError, IError, ISuccess } from "./http";
import { ResetPasswordInput, SignInInput } from "@/schemas/auth";
import { User } from "@/schemas/user";

class UserService extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }

  async sendEmailVerify(cookie: string) {
    try {
      return await this.get<{ message: string }>("/resend-email", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService signUp() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async changeEmail(cookie: string, input: Pick<SignInInput, "email">) {
    try {
      return await this.patch<{ message: string }>("/change-email", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService changeEmail() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async resetPassword(
    token: string,
    input: ResetPasswordInput
  ): Promise<
    | ISuccess<{
        message: string;
      }>
    | IError
  > {
    try {
      return await this.patch<{ message: string }>(
        "/auth/reset-password/" + token,
        input
      );
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService resetPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async getUserByPasswordResetToken(
    token: string
  ): Promise<ISuccess<User> | IError> {
    try {
      return await this.get<User>("/users/" + token);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log(
          "AuthService getUserByPasswordResetToken() method error: ",
          error
        );
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}
export default new UserService();
