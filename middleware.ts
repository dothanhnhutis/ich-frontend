import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/api/user.service";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const currentUser = await getCurrentUser();
  if (currentUser) {
    if (
      !currentUser.emailVerified &&
      (nextUrl.pathname.startsWith("/manager") ||
        nextUrl.pathname.startsWith("/user"))
    ) {
      return NextResponse.redirect(new URL("/auth/verify-email", nextUrl));
    }
    if (currentUser.emailVerified && nextUrl.pathname == "/auth/verify-email") {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (authRoutes.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  } else {
    if (
      nextUrl.pathname.startsWith("/manager") ||
      nextUrl.pathname.startsWith("/user") ||
      nextUrl.pathname == "/auth/verify-email"
    ) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
  }

  // const isLoggedIn = !!request.cookies.get("session");
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // if (isLoggedIn) {
  //   if (nextUrl.pathname.startsWith("/auth/error")) {
  //     return;
  //   }
  //   if (nextUrl.pathname.startsWith("/auth/signout")) {
  //     await http.get<any>("/auth/signout");
  //     const response = NextResponse.redirect(
  //       new URL("/auth/signin", request.url)
  //     );
  //     response.cookies.delete("session");
  //     return response;
  //   }
  //   if (nextUrl.pathname.startsWith("/auth")) {
  //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }

  //   return;
  // } else {
  //   if (
  //     nextUrl.pathname.startsWith("/manager") ||
  //     nextUrl.pathname.startsWith("/user")
  //   ) {
  //     return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  //   }
  //   return;
  // }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
