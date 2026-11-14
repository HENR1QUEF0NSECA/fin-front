import { NextResponse, type NextRequest } from "next/server";

import { clearSessionCookie } from "@/lib/session";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  clearSessionCookie(response);
  return response;
}
