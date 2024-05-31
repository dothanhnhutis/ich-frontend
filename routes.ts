import { UserRole } from "./schemas/user";

export const publicRoutes = ["/"];

export const authRoutes = ["/auth/signin", "/auth/signup"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/user/profile";

export const accessRoleRoutes: Record<UserRole, string[]> = {
  CUSTOMER: ["/user"],
  WRITER: ["/user", "/manager/posts"],
  SALER: ["/user"],
  MANAGER: ["/user", "/manager/posts", "/manager/products"],
  ADMIN: ["/"],
};
