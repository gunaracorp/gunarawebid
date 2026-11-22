import { NextResponse, type NextRequest } from "next/server";
import {
  expectedSessionToken,
  INTERNAL_COOKIE,
  timingSafeEqual,
} from "@/lib/internal-auth";

/** Penjaga gerbang situs internal — berlaku untuk semua /internal/* dan /api/internal/*.
 *  Rute yang dikecualikan: /internal/login (halaman gerbang) dan /api/internal/auth (pertukaran kunci). */
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const isLoginPage = pathname === "/internal/login";
  const isAuthEndpoint = pathname === "/api/internal/auth";
  if (isLoginPage || isAuthEndpoint) return NextResponse.next();

  const expected = await expectedSessionToken();

  // Tanpa kunci terpasang (env belum di-set): hentikan seluruh area internal
  // dengan pesan konfigurasi — jangan pernah membuka area rahasia secara diam-diam.
  if (!expected) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          ok: false,
          pesan: "Area internal belum dikonfigurasi — set env INTERNAL_ACCESS_KEY.",
        },
        { status: 503 }
      );
    }
    const url = req.nextUrl.clone();
    url.pathname = "/internal/login";
    url.search = "?setup=1";
    return NextResponse.redirect(url);
  }

  const cookie = req.cookies.get(INTERNAL_COOKIE)?.value ?? "";
  if (cookie && timingSafeEqual(cookie, expected)) {
    // Sudah masuk — jika menyentuh halaman login lagi, arahkan ke dashboard.
    if (pathname === "/internal") return NextResponse.next();
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/internal/login";
  url.search = `?from=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/internal/:path*", "/api/internal/:path*"],
};
