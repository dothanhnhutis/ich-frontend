export type CurrentUser = {
  id: string;
  email: string | null;
  username: string;
  role: UserRole;
  picture: string | null;
  isBlocked: boolean;
};
export type UserRole = "ADMIN" | "MANAGER" | "SALER" | "WRITER" | "CUSTOMER";
