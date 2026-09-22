import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The admin app has no page at `/` — the entry point is the dashboard.
 * Auth guarding is intentionally left as a TODO: `src/app/login/page.tsx` is a
 * static demo form that does not issue a session yet, so protecting
 * `/dashboard/*` here would lock the preview out.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"]
};
