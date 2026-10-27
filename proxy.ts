import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deleteCookie, getCookie } from "./services/auth/tokenHandler";
import { UserRole } from "./types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/authUtils";
import getLogedInUser from "./services/user/userManagement";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const rawAccessToken = (await getCookie("accessToken")) || null;

  // If access token available verify it and store user role otherwise delete accesstoken and refresh token if they are already available
  let userRole: UserRole | null = null;
  let isVerified = false;
  let accessToken: string | null = null;

  if (rawAccessToken) {
    try {
      const secret = (process.env.JWT_ACCESS_SECRET as string) || "";
      const verifiedToken = jwt.verify(rawAccessToken, secret) as JwtPayload;

      if (verifiedToken && typeof verifiedToken !== "string") {
        userRole = verifiedToken?.role;
        accessToken = rawAccessToken;

        try {
          const logedInUser = await getLogedInUser();
          isVerified = Boolean(logedInUser?.verifiedBadge);
        } catch {
          // Ignore profile fetch failure in proxy
        }
      } else {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
      }
    } catch {
      // If token verification fails (invalid signature, expired, or secret changed):
      // Clean up stale cookies so browser does not crash or get stuck in an error loop
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      userRole = null;
      accessToken = null;
    }
  }

  if (
    accessToken &&
    userRole === "USER" &&
    !isVerified &&
    pathname.startsWith("/user/dashboard") &&
    pathname !== "/user/dashboard/profile"
  ) {
    return NextResponse.redirect(new URL("/subscription", request.url));
  }

  if (!accessToken && pathname.startsWith("/travel-plans")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // redirect admin to user management when visit /admin/dashboard
  if (pathname === "/admin/dashboard") {
    return NextResponse.redirect(
      new URL("/admin/dashboard/users", request.url)
    );
  }

  if (pathname === "/user/dashboard") {
    return NextResponse.redirect(
      new URL("/user/dashboard/create-plan", request.url)
    );
  }

  // Get current route owner
  const routerOwner = getRouteOwner(pathname);

  // check if it's an auth route
  const isAuth = isAuthRoute(pathname);

  // If already loged in and trying to visit auth page redirect to his own dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // allow user to visit open public routes
  if (routerOwner === null) {
    return NextResponse.next();
  }

  // Allow user if they want to visit common protected routes
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  // If access token not available set a redirect searchparams with /login
  if (!accessToken && routerOwner === "USER") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // User is tring to access role based protected routes
  if (routerOwner === "ADMIN" || routerOwner === "USER") {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
