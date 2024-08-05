import { cookies } from "next/headers";
import { FetchHttp } from "./http";
import { SignInInput } from "@/schemas/auth";
export class UserService extends FetchHttp {
  constructor() {
    super("/api/v1/users");
  }

  async sendEmailVerify() {
    const allCookies = cookies().getAll();
    return await this.get<{ message: string }>("/resend-email", {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
    });
  }

  async changeEmail(input: Pick<SignInInput, "email">) {
    const allCookies = cookies().getAll();
    await this.patch<{ message: string }>("/change-email", input, {
      headers: {
        Cookie: allCookies
          .map((c) => `${c.name}=${encodeURIComponent(c.value)}`)
          .join("; "),
      },
    });
  }
}
