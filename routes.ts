import { User } from "./schemas/user";

export const emailVerifyRoute: string = "/account/verify-email";
export const apiAuthPrefix: string = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT: string = "/account/profile";

export const authRoutes: RegExp =
  /^\/auth\/(signin|signup|send-email|recover)?$/;
const BaseRoutes: RegExp =
  /^\/account\/(profile|settings|password-and-security)$/;
const PostRoutes: RegExp = /^\/manager\/posts(\/create|.+\/edit)?$/;
const ProductRoutes: RegExp = /^\/manager\/products(\/create|.+\/edit)?$/;
const UsersRoutes: RegExp = /^\/manager\/users(\/create|.+\/edit)?$/;

export const privateRegExpRoutes = [
  BaseRoutes,
  PostRoutes,
  ProductRoutes,
  UsersRoutes,
  /^\/manager$/,
];

export const roleAccessRoutes: Record<User["role"], RegExp[]> = {
  Customer: [BaseRoutes],
  Bloger: [BaseRoutes, PostRoutes],
  Saler: [],
  Manager: [BaseRoutes, PostRoutes, ProductRoutes],
  Admin: privateRegExpRoutes,
};
