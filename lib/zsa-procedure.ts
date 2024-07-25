import { createServerActionProcedure } from "zsa";
import { AuthService } from "@/service/collections/auth.collection";

export const baseProcedure = createServerActionProcedure().handler(async () => {
  const authService = new AuthService();
  return {
    authService,
  };
});
