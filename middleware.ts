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

function redirect(request: NextRequest, path?: string) {
  const { nextUrl } = request;
  console.log(nextUrl.pathname);
  console.log(nextUrl.searchParams.toString());
  //add Header
  const headers = new Headers(request.headers);
  headers.set("x-current-path", nextUrl.pathname);
  headers.set("x-current-search-params", nextUrl.searchParams.toString());

  if (path) {
    return NextResponse.redirect(new URL(path, nextUrl), {
      headers,
    });
  } else {
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }
}

export async function middleware(request: NextRequest) {
  let url: string | undefined;

  //Protected Route
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
      if (
        nextUrl.pathname == emailVerifyRoute ||
        (isPrivateRoute &&
          !roleAccessRoutes[currentUser.role].some((routes) =>
            routes.test(nextUrl.pathname)
          ))
      ) {
        url = DEFAULT_LOGIN_REDIRECT;
      }
    } else {
      if (isPrivateRoute) {
        url = emailVerifyRoute;
      }
    }

    if (authRoutes.test(nextUrl.pathname)) {
      url = DEFAULT_LOGIN_REDIRECT;
    }
  } else {
    if (isPrivateRoute || nextUrl.pathname == emailVerifyRoute) {
      url = "/auth/signin";
    }
  }

  return redirect(request, url);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
