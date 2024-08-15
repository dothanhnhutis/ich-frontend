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
    email: z
      .string({
        required_error: "Email field is required",
        invalid_type_error: "Email field must be string",
      })
      .email("Invalid email"),
    password: z
      .string({
        required_error: "Password field is required",
        invalid_type_error: "Password field must be string",
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
