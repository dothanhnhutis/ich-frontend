import { z } from "zod";
export const roles = [
  "Admin",
  "Manager",
  "Saler",
  "Bloger",
  "Customer",
] as const;
export const status = ["Active", "Suspended", "Disabled"] as const;

export const createPasswordSchema = z
  .object({
    newPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "New password must be string",
      })
      .min(8, "New password must be at least 8 characters long")
      .max(40, "New password can not be longer than 40 characters")
      .superRefine((val, ctx) => {
        const regex: RegExp =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
        if (!regex.test(val)) {
          ctx.addIssue({
            code: "custom",
            path: ["password", "format"],
            message:
              "Password must include: letters, numbers and special characters",
          });
        }
      }),
    confirmNewPassword: z.string(),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm password don't match",
    path: ["confirmNewPassword"],
  });

export const editPasswordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "Current password is required",
        invalid_type_error: "Current password must be string",
      })
      .min(1, "Current password can not empty."),
    newPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "New password must be string",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(40, "Password can not be longer than 40 characters")
      .superRefine((val, ctx) => {
        const regex: RegExp =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
        if (!regex.test(val)) {
          ctx.addIssue({
            code: "custom",
            path: ["password", "format"],
            message:
              "Password must include: letters, numbers and special characters",
          });
        }
      }),
    confirmNewPassword: z.string(),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Confirm password don't match",
    path: ["confirmNewPassword"],
  });

export const createUserSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be string",
    })
    .email("Invalid email"),
  status: z.enum(status),
  role: z.enum(roles),
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be string",
    })
    .min(1, "First name can't be empty"),
  lastName: z
    .string({
      required_error: "lastName is required",
      invalid_type_error: "lastName must be string",
    })
    .min(1, "Last name can't be empty"),
  password: z
    .string({
      required_error: "New password is required",
      invalid_type_error: "New password must be string",
    })
    .min(8, "New password must be at least 8 characters long")
    .max(40, "New password can not be longer than 40 characters")
    .superRefine((val, ctx) => {
      const regex: RegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
      if (!regex.test(val)) {
        ctx.addIssue({
          code: "custom",
          path: ["password", "format"],
          message:
            "Password must include: letters, numbers and special characters",
        });
      }
    }),
});

export const editProfileSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    address: z.string(),
  })
  .strip()
  .partial();

export const editPictureSchema = z.object({
  type: z.enum(["url", "base64"]),
  data: z.string(),
});

export const editUserSchema = createUserSchema
  .omit({ email: true, password: true })
  .extend({
    phone: z.string({
      required_error: "phone is required",
      invalid_type_error: "phone must be string",
    }),
    address: z.string({
      required_error: "address is required",
      invalid_type_error: "address must be string",
    }),
  })
  .partial();

export type CreatePasswordInput = z.infer<typeof createPasswordSchema>;
export type EditPasswordInput = z.infer<typeof editPasswordSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type EditUserInput = z.infer<typeof editUserSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type EditPictureInput = z.infer<typeof editPictureSchema>;

export type User = Omit<CreateUserInput, "password"> & {
  id: string;
  emailVerified: boolean;
  picture: string | null;
  hasPassword: boolean;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SearchUserInput = {
  email?: string[] | undefined;
  role?: User["role"] | undefined;
  emailVerified?: boolean | undefined;
  status?: User["status"];
  orderBy?:
    | (
        | "email.asc"
        | "email.desc"
        | "role.asc"
        | "role.desc"
        | "emailVerified.asc"
        | "emailVerified.desc"
      )[]
    | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export type SearchUserRes = User & {
  linkProviders: {
    provider: "google" | "credential";
  }[];
};
