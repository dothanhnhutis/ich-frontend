import { ResetPasswordInput, SignInInput, SignUpInput } from "@/schemas/auth";
import { FetchHttp, FetchHttpError, IError, ISuccess } from "./http";

class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn(input: SignInInput | Pick<SignInInput, "email">) {
    try {
      return await this.post<{ message: string }>("/signin", input);
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

  async reActivateAccount(email: string) {
    try {
      return await this.post<{ message: string }>("/reactivate", {
        email,
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

  async signUp(input: SignUpInput): Promise<
    | ISuccess<{
        message: string;
      }>
    | IError
  > {
    try {
      const res = await this.post<{ message: string }>("/signup", input);
      return res;
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
      const res = await this.patch<{ message: string }>(
        "/auth/reset-password/" + token,
        input
      );
      return res;
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

  async recover(email: string): Promise<
    | ISuccess<{
        message: string;
      }>
    | IError
  > {
    try {
      return await this.patch<{ message: string }>("/auth/recover", {
        email,
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService recover() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async activateAccount(token: string): Promise<
    | ISuccess<{
        message: string;
      }>
    | IError
  > {
    try {
      return await this.get<{ message: string }>("/auth/reactivate/" + token);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService activateAccount() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async verifyEmail(token: string): Promise<void | IError> {
    try {
      await this.get<{ message: string }>(`/auth/confirm-email/${token}`);
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("AuthService verifyEmail() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}

export default new AuthService();
