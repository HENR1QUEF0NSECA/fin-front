import "server-only";

import { cookies } from "next/headers";
import type { NextResponse } from "next/server";

import { env } from "./env";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(env.sessionCookieName)?.value ?? null;
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: env.sessionCookieName,
    value: token,
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: env.sessionCookieName,
    value: "",
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
