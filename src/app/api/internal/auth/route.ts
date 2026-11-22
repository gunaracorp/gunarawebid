import { NextResponse } from "next/server";
import {
  expectedSessionToken,
  INTERNAL_COOKIE,
  SESSION_MAX_AGE,
  sha256Hex,
  timingSafeEqual,
} from "@/lib/internal-auth";

/** POST /api/internal/auth — tukar kunci dengan cookie sesi internal. */
export async function POST(req: Request) {
  let key = "";
  try {
    const body = (await req.json()) as { key?: unknown };
    key = typeof body.key === "string" ? body.key : "";
  } catch {
    return NextResponse.json({ ok: false, pesan: "Permintaan tidak valid." }, { status: 400 });
  }

  const expected = await expectedSessionToken();
  if (!expected) {
    return NextResponse.json(
      { ok: false, pesan: "Kunci internal belum dikonfigurasi — set env INTERNAL_ACCESS_KEY." },
      { status: 503 }
    );
  }

  const candidate = await sha256Hex(`gunara-internal-v1::${key}`);
  if (!key || !timingSafeEqual(candidate, expected)) {
    // Jeda kecil untuk memperlambat percobaan bruteforce.
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ ok: false, pesan: "Kunci tidak cocok. Akses ditolak." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: INTERNAL_COOKIE,
    value: expected,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}

/** DELETE /api/internal/auth — keluar dari sesi internal. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: INTERNAL_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
