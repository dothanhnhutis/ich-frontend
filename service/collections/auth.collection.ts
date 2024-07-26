import { FetchHttp } from "./http";
type Provider = "google" | "github";

export class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn(data: { email: string; password?: string }) {
    return await this.post<{ message: string }>("/signin", data);
  }

  async signInWithProvider(provider: Provider) {}

  async reActivateAccount(email: string) {
    console.log("send: " + email);
    return true;
  }
}
