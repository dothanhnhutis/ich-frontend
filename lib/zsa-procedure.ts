import { AuthService } from "@/service/collections/auth.collection";

import { createServerActionProcedure } from "zsa";

export const baseProcedure = createServerActionProcedure().handler(async () => {
  const authService = new AuthService();
  return {
    authService,
  };
});
