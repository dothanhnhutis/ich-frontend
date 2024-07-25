"use server";
import { z } from "zod";
import { baseProcedure } from "@/lib/zsa-procedure";
import { cookieParser } from "@/lib/cookies-parser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
    const { headers, data } = await authService.signIn(input);
    for (const cookie of headers.getSetCookie()) {
      const parser = cookieParser(cookie);
      if (!parser) continue;
      const { name, value, ...opt } = parser;
      cookies().set(name, value, {
        ...opt,
      });
    }
    revalidatePath("/auth1/signin");
  });
