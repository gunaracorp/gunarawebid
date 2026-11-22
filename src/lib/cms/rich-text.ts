/**
 * Gunara CMS — Rich Text Inline v2 (Fase 2: Editor Ultra).
 *
 * Parser mini-markdown aman untuk format di dalam satu blok teks:
 *   **tebal**  *miring*  ~~coret~~  `kode`  ==sorot==  [teks](url)
 *
 * Hukum keamanan:
 * 1. Tidak pernah menghasilkan HTML — keluarannya segmen bertipe yang dirender
 *    sebagai elemen React murni, jadi injeksi <script> mustahil.
 * 2. URL tautan melewati gerbang amanHref() — hanya http/https, relatif, mailto.
 * 3. Tidak ada penyarangan — satu token per segmen; sederhana, cepat, teruji.
 *
 * Dipakai bersama oleh renderer (server), pratinjau editor (client), dan
 * toolbar format (client) — satu sumber kebenaran.
 */

export type InlineSeg =
  | { t: "text"; s: string }
  | { t: "bold" | "italic" | "strike" | "code" | "mark"; s: string }
  | { t: "link"; s: string; href: string };

export type TokenKind = "bold" | "italic" | "strike" | "code" | "mark";

const INLINE_RE =
  /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*|~~([^~\n]+)~~|==([^=\n]+)==|`([^`\n]+)`/g;

/** Gerbang URL: hanya http(s), tautan relatif "/", dan mailto yang lolos. */
export function amanHref(href: string): string | null {
  const h = href.trim();
  if (!h) return null;
  if (h.startsWith("/") && !h.startsWith("//")) return h;
  if (/^https?:\/\/[^\s]+$/i.test(h)) return h;
  if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(h)) return h;
  return null;
}

/** Teks → segmen bertipe. Selalu aman dirender di server maupun client. */
export function parseInline(text: string): InlineSeg[] {
  if (!text) return [];
  const out: InlineSeg[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "text", s: text.slice(last, i) });
    const [full, linkT, linkU, bold, italic, strike, mark, code] = m;
    if (linkT !== undefined) {
      const href = amanHref(linkU ?? "");
      if (href) out.push({ t: "link", s: linkT, href });
      else out.push({ t: "text", s: full });
    } else if (bold !== undefined) out.push({ t: "bold", s: bold });
    else if (italic !== undefined) out.push({ t: "italic", s: italic });
    else if (strike !== undefined) out.push({ t: "strike", s: strike });
    else if (mark !== undefined) out.push({ t: "mark", s: mark });
    else if (code !== undefined) out.push({ t: "code", s: code });
    last = i + full.length;
  }
  if (last < text.length) out.push({ t: "text", s: text.slice(last) });
  return out;
}

/** Buang semua token → teks polos (untuk slug TOC, excerpt, dan ringkasan). */
export function stripInline(text: string): string {
  if (!text) return "";
  return text.replace(
    INLINE_RE,
    (_full, linkT?: string, _u?: string, bold?: string, italic?: string, strike?: string, mark?: string, code?: string) =>
      linkT ?? bold ?? italic ?? strike ?? mark ?? code ?? ""
  );
}

// ── Operasi seleksi untuk toolbar editor ─────────────────────────────────────

const TOKEN: Record<TokenKind, string> = {
  bold: "**",
  italic: "*",
  strike: "~~",
  code: "`",
  mark: "==",
};

/** Token yang sedang "menempel" pada seleksi — untuk status aktif tombol. */
export function tokenAktif(text: string, start: number, end: number): Set<TokenKind> {
  const aktif = new Set<TokenKind>();
  if (end <= start) return aktif;
  for (const kind of Object.keys(TOKEN) as TokenKind[]) {
    const tok = TOKEN[kind];
    if (
      start >= tok.length &&
      text.slice(start - tok.length, start) === tok &&
      text.slice(end, end + tok.length) === tok
    ) {
      aktif.add(kind);
    }
  }
  return aktif;
}

/**
 * Bungkus (atau bongkar — toggle) seleksi dengan token.
 * Seleksi kosong: sisipkan pasangan token dan letakkan kursor di antaranya.
 * Kembalikan { text, start, end } agar kursor/select tetap pas setelah edit.
 */
export function wrapToken(
  text: string,
  start: number,
  end: number,
  kind: TokenKind
): { text: string; start: number; end: number } {
  const tok = TOKEN[kind];
  // Toggle-off: token sudah menempel di kedua sisi seleksi.
  if (
    start >= tok.length &&
    text.slice(start - tok.length, start) === tok &&
    text.slice(end, end + tok.length) === tok
  ) {
    return {
      text: text.slice(0, start - tok.length) + text.slice(start, end) + text.slice(end + tok.length),
      start: start - tok.length,
      end: end - tok.length,
    };
  }
  const sel = text.slice(start, end);
  const next =
    text.slice(0, start) + tok + (sel || "") + tok + text.slice(end);
  return {
    text: next,
    start: start + tok.length,
    end: end + tok.length,
  };
}

/** Ubah seleksi menjadi tautan [teks](url) — URL melewati gerbang amanHref. */
export function makeLink(
  text: string,
  start: number,
  end: number,
  href: string
): { text: string; start: number; end: number } | null {
  const safe = amanHref(href);
  if (!safe) return null;
  const sel = text.slice(start, end) || "tautan";
  const inserted = `[${sel}](${safe})`;
  return {
    text: text.slice(0, start) + inserted + text.slice(end),
    start: start + 1,
    end: start + 1 + sel.length,
  };
}
