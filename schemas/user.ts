export type CurrentUser = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  picture: string | null;
  emailVerified: boolean;
  isActive: boolean;
  isBlocked: boolean;
  phone: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};
export type UserRole = "ADMIN" | "MANAGER" | "SALER" | "WRITER" | "CUSTOMER";
