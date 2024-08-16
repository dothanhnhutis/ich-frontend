import { z } from "zod";
export const roles = [
  "Admin",
  "Manager",
  "Saler",
  "Bloger",
  "Customer",
] as const;
export const status = ["Active", "Suspended", "Disabled"] as const;

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

export const createUserSchema = z.object({
  email: z
    .string({
      required_error: "email field is required",
      invalid_type_error: "email field must be string",
    })
    .email("Invalid email"),
  status: z.enum(status),
  role: z.enum(roles),
  firstName: z
    .string({
      required_error: "firstName field is required",
      invalid_type_error: "firstName field must be string",
    })
    .min(1, "First name can't be empty"),
  lastName: z
    .string({
      required_error: "lastName field is required",
      invalid_type_error: "lastName field must be string",
    })
    .min(1, "Last name can't be empty"),
  password: z.string({
    required_error: "password field is required",
    invalid_type_error: "password field must be string",
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
      required_error: "phone field is required",
      invalid_type_error: "phone field must be string",
    }),
    address: z.string({
      required_error: "address field is required",
      invalid_type_error: "address field must be string",
    }),
    disabled: z.boolean({
      required_error: "disabled field is required",
      invalid_type_error: "disabled field must be boolean",
    }),
  })
  .partial();

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
