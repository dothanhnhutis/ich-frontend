export type CurrentUser = {
  id: string;
  email: string | null;
  username: string;
  role: UserRole;
  picture: string | null;
  emailVerified: boolean;
  isBlocked: string;
};
export type UserRole = "ADMIN" | "MANAGER" | "SALER" | "WRITER" | "CUSTOMER";
