/**
 * Gunara CMS — Block Engine.
 *
 * Konten = array blok bertipe (JSON), bukan HTML bebas. Ini yang membuat
 * Gunara CMS bisa berbuat jauh lebih dari WordPress klasik:
 *  - satu renderer untuk editor, pratinjau, situs publik, feed, dan API;
 *  - validasi ketat di gerbang (tidak ada sup HTML masuk ke database);
 *  - ekstraksi otomatis TOC, waktu baca, dan meta dari struktur — bukan tebakan.
 */

import { stripInline } from "@/lib/cms/rich-text";

// ── Tipe blok ────────────────────────────────────────────────────────────────

export type Align = "start" | "center";

export type Block =
  | { type: "paragraph"; text: string; align?: Align }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; mediaId: string; alt: string; caption?: string; wide?: boolean }
  | { type: "code"; language: string; code: string }
  | { type: "callout"; tone: "info" | "warn" | "success" | "brand"; title?: string; text: string }
  | { type: "divider" }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "cta"; title: string; text: string; href: string; label: string }
  | { type: "comparison"; headers: string[]; rows: string[][] }
  | { type: "timeline"; items: { date: string; title: string; text: string }[] }
  | { type: "embed"; url: string; title?: string }
  | { type: "methodology"; steps: { code: string; title: string; text: string }[] };

export const BLOCK_TYPES = [
  "paragraph",
  "heading",
  "quote",
  "list",
  "image",
  "code",
  "callout",
  "divider",
  "stats",
  "cta",
  "comparison",
  "timeline",
  "embed",
  "methodology",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const BLOCK_LABEL: Record<BlockType, string> = {
  paragraph: "Paragraf",
  heading: "Judul Bagian",
  quote: "Kutipan",
  list: "Daftar",
  image: "Gambar",
  code: "Kode",
  callout: "Sorotan",
  divider: "Pemisah",
  stats: "Panel Statistik",
  cta: "Seruan Aksi",
  comparison: "Tabel Perbandingan",
  timeline: "Garis Waktu",
  embed: "Sematan",
  methodology: "Langkah Metodologi",
};

// ── Validasi & normalisasi ───────────────────────────────────────────────────

const asString = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

const asBool = (v: unknown, fallback = false): boolean =>
  typeof v === "boolean" ? v : fallback;

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => asString(x)).filter((s) => s.length > 0) : [];

function clampHeadingLevel(v: unknown): 2 | 3 {
  return v === 3 ? 3 : 2;
}

function normalizeBlock(raw: unknown): Block | null {
  if (typeof raw !== "object" || raw === null) return null;
  const b = raw as Record<string, unknown>;
  const type = asString(b.type) as BlockType;
  switch (type) {
    case "paragraph": {
      const text = asString(b.text).trim();
      if (!text) return null;
      return { type, text, align: b.align === "center" ? "center" : "start" };
    }
    case "heading": {
      const text = asString(b.text).trim();
      if (!text) return null;
      return { type, text, level: clampHeadingLevel(b.level) };
    }
    case "quote": {
      const text = asString(b.text).trim();
      if (!text) return null;
      const attribution = asString(b.attribution).trim();
      return attribution ? { type, text, attribution } : { type, text };
    }
    case "list": {
      const items = asStringArray(b.items);
      if (items.length === 0) return null;
      return { type, ordered: asBool(b.ordered), items };
    }
    case "image": {
      const mediaId = asString(b.mediaId).trim();
      if (!mediaId) return null;
      const out: Extract<Block, { type: "image" }> = {
        type,
        mediaId,
        alt: asString(b.alt, "gambar"),
      };
      const caption = asString(b.caption).trim();
      if (caption) out.caption = caption;
      if (asBool(b.wide)) out.wide = true;
      return out;
    }
    case "code": {
      const code = asString(b.code);
      if (!code.trim()) return null;
      return {
        type,
        language: asString(b.language, "text").slice(0, 32),
        code: code.slice(0, 20000),
      };
    }
    case "callout": {
      const text = asString(b.text).trim();
      if (!text) return null;
      const tones = ["info", "warn", "success", "brand"] as const;
      const tone = tones.includes(asString(b.tone) as (typeof tones)[number])
        ? (asString(b.tone) as (typeof tones)[number])
        : "brand";
      const title = asString(b.title).trim();
      return title ? { type, tone, title, text } : { type, tone, text };
    }
    case "divider":
      return { type };
    case "stats": {
      const items = Array.isArray(b.items)
        ? b.items
            .map((it) => {
              const o = (it ?? {}) as Record<string, unknown>;
              return { value: asString(o.value).trim(), label: asString(o.label).trim() };
            })
            .filter((it) => it.value || it.label)
        : [];
      if (items.length === 0) return null;
      return { type, items: items.slice(0, 6) };
    }
    case "cta": {
      const title = asString(b.title).trim();
      const href = asString(b.href).trim();
      if (!title || !href) return null;
      return {
        type,
        title,
        text: asString(b.text).trim(),
        href,
        label: asString(b.label, "Buka").trim() || "Buka",
      };
    }
    case "comparison": {
      const headers = asStringArray(b.headers).slice(0, 4);
      if (headers.length === 0) return null;
      const rows = Array.isArray(b.rows)
        ? b.rows
            .map((r) => asStringArray(r).slice(0, headers.length))
            .filter((r) => r.length > 0)
            .slice(0, 12)
        : [];
      if (rows.length === 0) return null;
      return { type, headers, rows };
    }
    case "timeline": {
      const items = Array.isArray(b.items)
        ? b.items
            .map((it) => {
              const o = (it ?? {}) as Record<string, unknown>;
              return {
                date: asString(o.date).trim(),
                title: asString(o.title).trim(),
                text: asString(o.text).trim(),
              };
            })
            .filter((it) => it.title)
            .slice(0, 10)
        : [];
      if (items.length === 0) return null;
      return { type, items };
    }
    case "embed": {
      const url = asString(b.url).trim();
      if (!/^https?:\/\//i.test(url)) return null;
      const title = asString(b.title).trim();
      return title ? { type, url, title } : { type, url };
    }
    case "methodology": {
      const steps = Array.isArray(b.steps)
        ? b.steps
            .map((it) => {
              const o = (it ?? {}) as Record<string, unknown>;
              return {
                code: asString(o.code).trim(),
                title: asString(o.title).trim(),
                text: asString(o.text).trim(),
              };
            })
            .filter((it) => it.title)
            .slice(0, 8)
        : [];
      if (steps.length === 0) return null;
      return { type, steps };
    }
    default:
      return null;
  }
}

/** Validasi gerbang: string JSON → blok bersih. Blok rusak dibuang diam-diam. */
export function parseBlocks(json: string | null | undefined): Block[] {
  if (!json) return [];
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  return data.map(normalizeBlock).filter((b): b is Block => b !== null);
}

/** Array blok runtime → string JSON bersih untuk disimpan. */
export function serializeBlocks(blocks: unknown[]): string {
  return JSON.stringify(
    blocks.map(normalizeBlock).filter((b): b is Block => b !== null)
  );
}

// ── Utilitas turunan ─────────────────────────────────────────────────────────

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export function headingAnchor(text: string): string {
  return slugify(stripInline(text)) || "bagian";
}

/** Waktu baca: ~200 kata/menit + penalti kecil untuk gambar/kode. */
export function computeReadingMinutes(blocks: Block[]): number {
  return Math.max(1, Math.ceil(countWords(blocks) / 200));
}

/** Jumlah kata murni dari seluruh blok — untuk statistik editor live. */
export function countWords(blocks: Block[]): number {
  let words = 0;
  for (const b of blocks) {
    switch (b.type) {
      case "paragraph":
      case "heading":
      case "quote":
        words += b.text.split(/\s+/).filter(Boolean).length;
        break;
      case "list":
        words += b.items.join(" ").split(/\s+/).filter(Boolean).length;
        break;
      case "callout":
      case "cta":
        words += `${b.title ?? ""} ${b.text}`.split(/\s+/).filter(Boolean).length;
        break;
      case "timeline":
      case "methodology":
        words += b.items
          .map((i) => `${i.date} ${i.title} ${i.text}`)
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length;
        break;
      case "comparison":
        words += [b.headers.join(" "), ...b.rows.map((r) => r.join(" "))]
          .join(" ")
          .split(/\s+/)
          .filter(Boolean).length;
        break;
      case "image":
        words += 12;
        break;
      case "code":
        words += 20;
        break;
      default:
        break;
    }
  }
  return words;
}

/** Daftar isi otomatis dari blok heading level-2. */
export function extractToc(blocks: Block[]): { anchor: string; text: string }[] {
  return blocks
    .filter(
      (b): b is Extract<Block, { type: "heading" }> =>
        b.type === "heading" && b.level === 2
    )
    .map((b) => ({ anchor: headingAnchor(b.text), text: stripInline(b.text) }));
}

/** Pratinjau teks otomatis dari blok, dipakai bila excerpt kosong. */
export function deriveExcerpt(blocks: Block[], fallback = ""): string {
  if (fallback.trim()) return fallback.trim().slice(0, 220);
  const para = blocks.find((b) => b.type === "paragraph");
  if (para && para.type === "paragraph") return stripInline(para.text).slice(0, 220);
  const quote = blocks.find((b) => b.type === "quote");
  if (quote && quote.type === "quote") return stripInline(quote.text).slice(0, 220);
  return "";
}

export const STATUS_LABEL: Record<string, { label: string; tone: string }> = {
  draft: { label: "Draf", tone: "text-[#5c87b8] border-[#254872]" },
  review: { label: "Ulasan", tone: "text-sky-300 border-sky-500/40" },
  scheduled: { label: "Terjadwal", tone: "text-violet-300 border-violet-500/40" },
  published: { label: "Terbit", tone: "text-[var(--gn-amber-400)] border-[var(--gn-amber-500)]/50" },
};
