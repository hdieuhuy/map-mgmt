import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const path = request.nextUrl.pathname;

  console.log({ userCookie, path });

  // Chưa đăng nhập
  if (!userCookie && (path.startsWith("/admin") || path.startsWith("/"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kiểm tra quyền admin
  if (path.startsWith("/admin")) {
    if (userCookie) {
      const user = JSON.parse(userCookie.value);
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/:path*"],
};
