"use server";
import { z } from "zod";
import { baseProcedure } from "@/lib/zsa-procedure";
import { cookieParser } from "@/lib/cookies-parser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

const signInSchema = z.object({
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
    .max(40, "invalid email or password")
    .optional(),
});

export const signIn = baseProcedure
  .createServerAction()
  .input(signInSchema, { type: "formData" })
  .handler(async ({ input, ctx }) => {
    const { authService } = ctx;

    const { data, headers } = await authService.signIn(input);

    // // console.log(headers.getSetCookie());
    // for (const cookie of headers.getSetCookie()) {
    //   const parser = cookieParser(cookie);
    //   if (!parser) continue;
    //   const { name, value, ...opt } = parser;
    //   cookies().set(name, value, opt);
    // }
    // console.log(data);
    // revalidatePath("/auth1/signin");
    return "qweqwe";
  });

export const reActivateAccount = baseProcedure
  .createServerAction()
  .input(signInSchema.pick({ email: true }), { type: "json" })
  .handler(async ({ input, ctx }) => {
    const { authService } = ctx;
    await authService.reActivateAccount(input.email);
    cookies().set("send-email", "true");
    redirect("/auth1/send-email");
  });

export const clearSendEmail = createServerAction().handler(async () => {
  cookies().delete("send-email");
});
