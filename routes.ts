import { UserRole } from "./schemas/user";

export const publicRoutes = ["/"];

export const emailVerifyRoute: string = "/auth/verify-email";
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/user/profile";

export const authRoutes: RegExp = /^\/auth\/(signin|signup|send-email)?$/;
const BaseRoutes: RegExp = /^\/user\/(profile|settings|password-and-security)$/;
const PostRoutes: RegExp = /^\/manager\/posts(\/create|.+\/edit)?$/;
const ProductRoutes: RegExp = /^\/manager\/products(\/create|.+\/edit)?$/;
const UsersRoutes: RegExp = /^\/manager\/users(\/create|.+\/edit)?$/;

export const privateRegExpRoutes = [
  BaseRoutes,
  PostRoutes,
  ProductRoutes,
  UsersRoutes,
];

export const roleAccessRoutes: Record<UserRole, RegExp[]> = {
  CUSTOMER: [BaseRoutes],
  WRITER: [BaseRoutes, PostRoutes],
  SALER: [],
  MANAGER: [BaseRoutes, PostRoutes, ProductRoutes],
  ADMIN: privateRegExpRoutes,
};
