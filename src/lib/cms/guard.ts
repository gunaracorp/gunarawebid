/**
 * Penjaga lapis-kedua untuk API CMS internal (defense in depth).
 * Middleware sudah menutup /api/internal/* — handler memeriksa ulang di sini.
 */
import { cookies } from "next/headers";
import {
  expectedSessionToken,
  INTERNAL_COOKIE,
  timingSafeEqual,
} from "@/lib/internal-auth";

export async function sesiInternalValid(): Promise<boolean> {
  const expected = await expectedSessionToken();
  if (!expected) return false;
  const jar = await cookies();
  const cookie = jar.get(INTERNAL_COOKIE)?.value ?? "";
  return cookie.length > 0 && timingSafeEqual(cookie, expected);
}
