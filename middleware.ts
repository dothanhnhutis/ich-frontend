import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  privateRegExpRoutes,
  roleAccessRoutes,
  DEFAULT_LOGOUT_REDIRECT,
  EMAIL_VERIFY_ROUTE,
} from "@/routes";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./app/actions";

function redirect(request: NextRequest, path?: string) {
  const { nextUrl, url } = request;
  //add Header
  const headers = new Headers(request.headers);
  headers.set("x-current-path", nextUrl.pathname);
  headers.set("x-current-search-params", nextUrl.searchParams.toString());

  if (path) {
    console.log("redirect ", url);
    const response = NextResponse.redirect(new URL(path, url), {
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

  if (currentUser) {
    if (currentUser.emailVerified) {
      if (nextUrl.pathname == EMAIL_VERIFY_ROUTE)
        return redirect(request, DEFAULT_LOGIN_REDIRECT);
      if (
        !roleAccessRoutes[currentUser.role].some((routes) =>
          routes.test(nextUrl.pathname)
        )
      )
        return redirect(request, DEFAULT_LOGIN_REDIRECT);
    } else {
      if (isPrivateRoute) return redirect(request, EMAIL_VERIFY_ROUTE);
    }
    if (authRoutes.test(nextUrl.pathname)) {
      return redirect(request, DEFAULT_LOGIN_REDIRECT);
    }
  } else {
    if (isPrivateRoute || nextUrl.pathname == EMAIL_VERIFY_ROUTE) {
      return redirect(request, DEFAULT_LOGOUT_REDIRECT);
    }
  }

  // if (isLoggedIn) {
  //   if (emailVerified) {
  //     if (
  //       nextUrl.pathname == EMAIL_VERIFY_ROUTE ||
  //       (isPrivateRoute &&
  //         !roleAccessRoutes[currentUser.role].some((routes) =>
  //           routes.test(nextUrl.pathname)
  //         ))
  //     ) {
  //       url = DEFAULT_LOGIN_REDIRECT;
  //     }
  //   } else {
  //     if (isPrivateRoute) {
  //       url = EMAIL_VERIFY_ROUTE;
  //     }
  //   }

  //   if (authRoutes.test(nextUrl.pathname)) {
  //     url = DEFAULT_LOGIN_REDIRECT;
  //   }
  // } else {
  //   if (isPrivateRoute || nextUrl.pathname == EMAIL_VERIFY_ROUTE) {
  //     url = DEFAULT_LOGOUT_REDIRECT;
  //   }
  // }

  // return redirect(request, url);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
