import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "email field is required",
      invalid_type_error: "email field must be string",
    })
    .email("invalid email or password"),
  password: z
    .string({
      required_error: "password field is required",
      invalid_type_error: "password field must be string",
    })
    .min(8, "invalid email or password")
    .max(40, "invalid email or password"),
});

export const signUpSchema = z
  .object({
    username: z
      .string({
        required_error: "Username field is required",
        invalid_type_error: "Username field must be string",
      })
      .min(1, "username_empty"),
    email: z
      .string({
        required_error: "Email field is required",
        invalid_type_error: "Email field must be string",
      })
      .email("invaid_email"),
    password: z
      .string({
        required_error: "Password field is required",
        invalid_type_error: "Password field must be string",
      })
      .min(8, "password_too_small")
      .max(40, "password_too_big")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "password_format_error"
      ),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "Password field is required",
        invalid_type_error: "Password field must be string",
      })
      .min(8, "password_too_small")
      .max(40, "password_too_big")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "password_format_error"
      ),
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "password_do_not_match",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
