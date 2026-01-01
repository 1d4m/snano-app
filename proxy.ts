import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isLogin = pathname.startsWith("/login");
  const isAuthApi = pathname.startsWith("/api/auth");

  // --- 未ログインの場合：login 以外は全部リダイレクト ---
  if (!isLoggedIn && !isLogin && !isAuthApi) {
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(nextUrl.pathname)}`, req.url)
    );
  }

  // // --- ログイン済の場合：/login に来たらトップへ返す ---
  // if (isLoggedIn && isLogin) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // 静的ファイルや Next 内部は除外
    "/((?!_next/static|_next/image|favicon.ico|robots.txt).*)",
  ],
};
