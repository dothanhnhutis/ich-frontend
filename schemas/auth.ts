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
      .min(1, "Username can't be empty"),
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
      .min(8, "Password field is too short")
      .max(40, "Password field can not be longer than 40 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/,
        "Password field must include: letters, numbers and special characters"
      ),
    code: z
      .string({
        required_error: "Code field is required",
        invalid_type_error: "Code field must be string",
      })
      .length(6, "Code field include 6 characters"),
  })
  .strict();
export type SignInForm = z.infer<typeof signInSchema>;
export type SignUpForm = z.infer<typeof signupSchema>;
