"use server";
import { redirect } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.zodSchema";
import { parse } from "cookie";
import { setCookie } from "@/services/auth/tokenHandler";
import { UserRole } from "@/types/user.interface";
import { serverFetch } from "@/lib/serverFetch";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/authUtils";

export const userLogin = async (
  _currentState?: any,
  formData?: any,
  demoAdminDetails?: any,
  demoUserDetails?: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObj: null | any = null;
    let refreshTokenObj: null | any = null;

    const demoType = formData.get("demoType");
    let payload

    if (demoType === "admin") {
      payload = {
        email: "admindemo@gmail.com",
        password: "123456",
      };
    } else if (demoType === "user") {
      payload = {
        email: "userdemo@gmail.com",
        password: "123456",
      };
    } else {
      payload = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
    }


    // Validate with zod
    if (zodValidator(payload, loginValidationZodSchema).success === false) {
      return zodValidator(payload, loginValidationZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      loginValidationZodSchema
    )?.data;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!result?.success) {
      return {
        success: false,
        message: result?.message || "Login failed. Please check your credentials.",
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObj = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObj = parsedCookie;
        }
      });
    }

    // Fallback: If cookies were not in set-cookie headers but in response data
    if (!accessTokenObj && result?.data?.accessToken) {
      accessTokenObj = {
        accessToken: result.data.accessToken,
        "Max-Age": "86400",
        Path: "/",
        SameSite: "none",
      };
    }

    if (!refreshTokenObj && result?.data?.refreshToken) {
      refreshTokenObj = {
        refreshToken: result.data.refreshToken,
        "Max-Age": "2592000",
        Path: "/",
        SameSite: "none",
      };
    }

    if (!accessTokenObj) {
      throw new Error("Access Token object not found in cookies");
    }

    // Set access token to browser cookie
    await setCookie("accessToken", accessTokenObj.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObj["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObj.Path || "/",
      sameSite: accessTokenObj["SameSite"] || "none",
    });

    if (refreshTokenObj) {
      // Set refresh token to browser cookie
      await setCookie("refreshToken", refreshTokenObj.refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: parseInt(refreshTokenObj["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
        path: refreshTokenObj.Path || "/",
        sameSite: refreshTokenObj["SameSite"] || "none",
      });
    }

    // Safely extract user role from token
    let userRole: UserRole | undefined;
    if (process.env.JWT_ACCESS_SECRET) {
      try {
        const verified = jwt.verify(
          accessTokenObj.accessToken,
          process.env.JWT_ACCESS_SECRET
        ) as JwtPayload;
        userRole = verified?.role;
      } catch {
        // Fall back to decode if secret doesn't match
      }
    }

    if (!userRole) {
      const decoded = jwt.decode(accessTokenObj.accessToken) as JwtPayload;
      userRole = decoded?.role;
    }

    if (!userRole) {
      throw new Error("Invalid token: could not determine user role");
    }

    if (redirectTo) {
      const redirectPath = redirectTo.toString();
      const safeRedirect = redirectPath.startsWith("/")
        ? redirectPath
        : `/${redirectPath}`;

      if (isValidRedirectForRole(redirectPath, userRole)) {
        redirect(`${safeRedirect}?login=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?login=true`);
      }
    } else {
      redirect(`/?login=true`);
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.log("Error while user loging", err);
    return {
      success: false,
      error: err,
      message: err?.message || "Login failed. Please check your credentials.",
    };
  }
};
