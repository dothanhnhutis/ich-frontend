import { FetchHttp, FetchHttpError, IError, ISuccess } from "./http";
import { ResetPasswordInput, SignInInput } from "@/schemas/auth";
import {
  EditPassword,
  EditPictureInput,
  EditProfileInput,
  User,
} from "@/schemas/user";

class UserService extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }

  async editProfile(cookie: string, input: EditProfileInput) {
    try {
      return await this.patch<{ message: string }>("", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editProfile() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async editPicture(cookie: string, input: EditPictureInput) {
    try {
      return await this.post<{ message: string }>("/picture", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editProfile() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async currentUser(cookie: string) {
    try {
      return await this.get<User>("/me", {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService currentUser() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
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
        console.log("UserService sendEmailVerify() method error: ", error);
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
        console.log("UserService changeEmail() method error: ", error);
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
        console.log("UserService resetPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }

  async getUserByPasswordResetToken(token: string) {
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

  async disactivateAccount(cookie: string) {
    try {
      return await this.patch<{ message: string }>(
        "/disactivate",
        {},
        {
          headers: {
            Cookie: cookie,
          },
        }
      );
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService disactivateAccount() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
  async editPassword(cookie: string, input: EditPassword) {
    try {
      return await this.post<{ message: string }>("/change-password", input, {
        headers: {
          Cookie: cookie,
        },
      });
    } catch (error: any) {
      if (error instanceof FetchHttpError) {
        return error.serialize();
      } else {
        console.log("UserService editPassword() method error: ", error);
        return {
          success: false,
          data: { message: error.message },
        } as IError;
      }
    }
  }
}
export default new UserService();
