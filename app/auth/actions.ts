"use server";
import { baseProcedure } from "@/lib/zsa-procedure";
import { cookieParser } from "@/lib/cookies-parser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";
import { signInSchema, signUpSchema } from "@/schemas/auth";

export const emailCheck = baseProcedure
  .createServerAction()
  .input(signInSchema.pick({ email: true }), { type: "json" })
  .handler(async ({ input, ctx }) => {
    cookies().set("registered", "", {
      expires: 0,
      path: "/auth/signin",
    });
    const { authService } = ctx;
    const { data } = await authService.signIn(input);
    return data;
  });

export const signIn = baseProcedure
  .createServerAction()
  .input(signInSchema, { type: "json" })
  .handler(async ({ input, ctx }) => {
    cookies().set("registered", "", {
      expires: 0,
      path: "/auth/signin",
    });
    const { authService } = ctx;
    const { data, headers } = await authService.signIn(input);
    for (const cookie of headers.getSetCookie()) {
      const parser = cookieParser(cookie);
      if (parser) {
        console.log(parser);
        const { name, value, ...opt } = parser;
        cookies().set(name, value, opt);
      }
    }
    revalidatePath("/auth/signin");
    redirect("/account/profile");
  });

export const reActivateAccount = baseProcedure
  .createServerAction()
  .input(signInSchema.pick({ email: true }), { type: "json" })
  .handler(async ({ input, ctx }) => {
    const { authService } = ctx;
    await authService.reActivateAccount(input.email);
    cookies().set("send-email", "true");
    redirect("/auth/send-email");
  });

export const clearSendEmail = createServerAction().handler(async () => {
  cookies().delete("send-email");
});

export const signUp = baseProcedure
  .createServerAction()
  .input(signUpSchema, { type: "json" })
  .handler(async ({ input, ctx }) => {
    const { authService } = ctx;
    const { data } = await authService.signUp(input);
    return data;
  });

export const sendEmailVerify = baseProcedure
  .createServerAction()
  .handler(async ({ input, ctx }) => {
    const { userService } = ctx;
    await userService.sendEmailVerify();
  });

export const changeEmail = baseProcedure
  .createServerAction()
  .input(signUpSchema.pick({ email: true }), { type: "json" })
  .handler(async ({ input, ctx }) => {
    const { userService } = ctx;
    await userService.changeEmail(input);
    revalidatePath("/auth/verify-email");
  });
