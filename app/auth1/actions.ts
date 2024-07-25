"use server";
import { z } from "zod";
import { baseProcedure } from "@/lib/zsa-procedure";

const signInSchema = z.object({
  email: z.string().email("Invalid email or password"),
  password: z
    .string({
      invalid_type_error: "Password must be string",
      required_error: "Password is required",
    })
    .min(1, "Invalid email or password"),
});

export const signIn = baseProcedure
  .createServerAction()
  .input(signInSchema, { type: "formData" })
  .handler(async ({ input, ctx }) => {
    const { authService } = ctx;
    console.log(input);
    // const kk = await authService.signIn(input);

    // console.log(kk);
    return "";
  });
