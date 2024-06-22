import { z } from "zod";

export const editPasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "password_too_small")
      .max(40, "password_too_big")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "password_format_error"
      ),
    confirmNewPassword: z.string(),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "password_do_not_match",
    path: ["confirmNewPassword"],
  });

export type EditPassword = z.infer<typeof editPasswordSchema>;

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
