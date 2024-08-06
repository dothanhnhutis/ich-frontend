import { z } from "zod";
export const roles = ["MANAGER", "SALER", "WRITER", "CUSTOMER"] as const;
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
  inActive: z.boolean({
    required_error: "inActive field is required",
    invalid_type_error: "inActive field must be boolean",
  }),
  role: z.enum(roles),
  username: z.string({
    required_error: "username field is required",
    invalid_type_error: "username field must be string",
  }),
  password: z.string({
    required_error: "password field is required",
    invalid_type_error: "password field must be string",
  }),
});

export const editProfileSchema = z
  .object({
    username: z.string(),
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
    bio: z
      .string({
        required_error: "bio field is required",
        invalid_type_error: "bio field must be string",
      })
      .max(255, "bio_length_error"),
    phone: z.string({
      required_error: "phone field is required",
      invalid_type_error: "phone field must be string",
    }),
    picture: z
      .string({
        required_error: "picture field is required",
        invalid_type_error: "picture field must be string",
      })
      .nullable(),
    address: z.string({
      required_error: "address field is required",
      invalid_type_error: "address field must be string",
    }),
  })
  .partial();

export type EditPassword = z.infer<typeof editPasswordSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type EditUserType = z.infer<typeof editUserSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type EditPictureInput = z.infer<typeof editPictureSchema>;

export type Role = "ADMIN" | CreateUserType["role"];

export type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  emailVerificationExpires?: Date | null;
  emailVerificationToken?: string | null;
  username: string;
  picture: string | null;
  hasPassword: boolean;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  role: Role;
  suspended: boolean;
  inActive: boolean;
  reActiveToken?: string | null;
  reActiveExpires?: Date | null;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
