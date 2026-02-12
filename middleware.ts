import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If user is not logged in and tries to access protected route
  if (!token && pathname.startsWith("/products")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and tries to access login page
  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/products/:path*"],
};
