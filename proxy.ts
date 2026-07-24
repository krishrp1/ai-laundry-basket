import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Kept in sync with SESSION_COOKIE_NAME in lib/session.ts. Deliberately not
// imported from there to keep this file free of jose/env/Node-only deps.
const SESSION_COOKIE_NAME = "admin_session";

// Optimistic, cookie-only check: keeps unauthenticated visitors out of /admin
// without hitting the database on every navigation. Real enforcement lives in
// the admin layout's DAL check and in every admin Server Action, since Proxy
// is not a substitute for per-request authorization.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const hasSession = request.cookies.has(SESSION_COOKIE_NAME);
    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
