/**
 * Sistem akses internal gunara.web.id — satu kunci, satu cookie, tanpa database.
 *
 * Hukum keamanan:
 * 1. Kunci tidak pernah ditulis di repo — hidup di env `INTERNAL_ACCESS_KEY`
 *    (.env.local untuk lokal, Environment Variables di Vercel untuk produksi).
 * 2. Cookie hanya menyimpan HASH token (SHA-256), bukan kuncinya.
 * 3. Seluruh rute /internal/* dan /api/internal/* dijaga middleware — tidak ada
 *    kebocoran lewat lupa penjagaan di satu halaman.
 */

export const INTERNAL_COOKIE = "gn_int_session";
export const INTERNAL_SALT = "gunara-internal-v1";

/** Token sesi yang diharapkan = SHA-256(salt :: kunci). Konsisten di edge & node. */
export async function expectedSessionToken(): Promise<string | null> {
  const key = process.env.INTERNAL_ACCESS_KEY;
  if (!key) return null;
  return sha256Hex(`${INTERNAL_SALT}::${key}`);
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Perbandingan konstanta-waktu sederhana untuk token hex berpanjang sama. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 jam kerja
