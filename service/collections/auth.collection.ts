import { SignInInput, SignUpInput } from "@/schemas/auth";
import { FetchHttp } from "./http";
import { cookies } from "next/headers";
type Provider = "google" | "github";

export class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn(data: SignInInput | Pick<SignInInput, "email">) {
    return await this.post<{ message: string }>("/signin", data);
  }

  async signInWithProvider(provider: Provider) {}

  async reActivateAccount(email: string) {
    await this.post<{ message: string }>("/reactivate", { email });
    return true;
  }

  async signUp(data: SignUpInput) {
    return await this.post<{ message: string }>("/signup", data);
  }
}
