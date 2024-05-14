import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email("Invalid email or password"),
    password: z
      .string({
        invalid_type_error: "Password must be string",
        required_error: "Password is required",
      })
      .min(8, "Invalid email or password")
      .max(40, "Invalid email or password"),
  })
  .strict();

export const signupSchema = z
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
    code: z
      .string({
        required_error: "Code field is required",
        invalid_type_error: "Code field must be string",
      })
      .length(6, "code_error"),
  })
  .strict();
export const signupWithoutCodeSchema = signupSchema.omit({ code: true });

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

export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signupSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
