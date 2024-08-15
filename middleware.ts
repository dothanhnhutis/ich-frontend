import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  emailVerifyRoute,
  privateRegExpRoutes,
  roleAccessRoutes,
  DEFAULT_LOGOUT_REDIRECT,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./app/actions";

function redirect(request: NextRequest, path?: string) {
  const { nextUrl } = request;
  //add Header
  const headers = new Headers(request.headers);
  headers.set("x-current-path", nextUrl.pathname);
  headers.set("x-current-search-params", nextUrl.searchParams.toString());

  if (path) {
    const response = NextResponse.redirect(new URL(path, nextUrl), {
      headers,
    });
    if (path == "/login") response.cookies.delete("session");
    return response;
  } else {
    const response = NextResponse.next({
      request: {
        headers,
      },
    });
    return response;
  }
}

export async function middleware(request: NextRequest) {
  let url: string | undefined;

  //Protected Route
  const { nextUrl } = request;
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;
  const emailVerified = currentUser?.emailVerified || false;
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
      url = DEFAULT_LOGOUT_REDIRECT;
    }
  }

  return redirect(request, url);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
