import { User } from "@/types";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

export function setAuthCookies(
  token: string,
  refresh_token: string,
  user?: User,
) {
  setCookie("auth_token", token, {
    path: "/",
    sameSite: "lax",
    secure: false,
  });

  setCookie("auth_refresh_token", refresh_token, {
    // maxAge: sevenDays,
    path: "/",
    sameSite: "lax",
    secure: false,
  });

  if (user) {
    setCookie("auth_user", JSON.stringify(user), {
      path: "/",
      sameSite: "lax",
    });
  }
}

export function clearAuthCookies() {
  deleteCookie("auth_token");
  deleteCookie("auth_refresh_token");
  deleteCookie("auth_user");
}

export function getAuthToken() {
  return getCookie("auth_token");
}

export function getAuthRefreshToken() {
  return getCookie("auth_refresh_token");
}

export function getAuthUser() {
  const rawUser = getCookie("auth_user");
  try {
    return rawUser ? JSON.parse(rawUser as string) : null;
  } catch (error) {
    console.error("Failed to parse auth_user cookie:", error);
    return null;
  }
}
