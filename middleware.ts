import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  emailVerifyRoute,
  privateRegExpRoutes,
  roleAccessRoutes,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/api/user.service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;
  const emailVerified = currentUser?.emailVerified || false;
  const isClosed = currentUser?.isActive || false;
  const isBlocked = currentUser?.isBlocked || false;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPrivateRoute = privateRegExpRoutes.some((routes) =>
    routes.test(nextUrl.pathname)
  );

  if (isLoggedIn) {
    if (emailVerified) {
      if (nextUrl.pathname == emailVerifyRoute)
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

      if (
        isPrivateRoute &&
        !roleAccessRoutes[currentUser.role].some((routes) =>
          routes.test(nextUrl.pathname)
        )
      ) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    } else {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL(emailVerifyRoute, nextUrl));
      }
    }

    if (authRoutes.test(nextUrl.pathname)) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  } else {
    if (isPrivateRoute || nextUrl.pathname == emailVerifyRoute) {
      return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
    // if (nextUrl.pathname == "/auth/send-email" && !cookies().has("eid")) {
    //   return NextResponse.redirect(new URL("/not-found", nextUrl));
    // }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
