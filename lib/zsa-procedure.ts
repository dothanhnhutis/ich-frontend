import { createServerActionProcedure } from "zsa";
import { AuthService } from "@/service/collections/auth.collection";
import { UserService } from "@/service/collections/user-collections";

export const baseProcedure = createServerActionProcedure().handler(async () => {
  const authService = new AuthService();
  const userService = new UserService();

  return {
    authService,
    userService,
  };
});
