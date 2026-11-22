import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";

/**
 * POST /api/internal/cms/upload — unggah berkas media ke pustaka (biner di DB).
 * Batas 8 MB. Tipe: PNG, JPEG, WebP, GIF, SVG (disanitasi).
 */
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
};

/** Sanitasi SVG dasar: buang <script>, atribut event, dan url javascript:. */
function sanitizeSvg(svg: string): string {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/data:text\/html/gi, "");
}

export async function POST(req: Request) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, pesan: "Berkas tidak ditemukan." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, pesan: "Ukuran melebihi 8 MB." }, { status: 413 });
  }
  const mime = (file.type || "").toLowerCase();
  if (!ALLOWED[mime]) {
    return NextResponse.json(
      { ok: false, pesan: `Tipe ${mime || "tidak dikenal"} tidak didukung.` },
      { status: 415 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let width: number | null = null;
  let height: number | null = null;
  let data: Buffer = buffer;

  if (mime === "image/svg+xml") {
    const text = buffer.toString("utf8");
    if (!/<svg[\s>]/i.test(text)) {
      return NextResponse.json({ ok: false, pesan: "SVG tidak valid." }, { status: 415 });
    }
    data = Buffer.from(sanitizeSvg(text), "utf8");
    const vb = text.match(/viewBox\s*=\s*"[\d.\s-]+"/i)?.[0];
    const dims = vb?.match(/[\d.]+/g);
    if (dims && dims.length >= 2) {
      width = Math.round(Number(dims[0]));
      height = Math.round(Number(dims[1]));
    }
  } else {
    try {
      const sharp = (await import("sharp")).default;
      const meta = await sharp(buffer).metadata();
      width = meta.width ?? null;
      height = meta.height ?? null;
    } catch {
      // sharp tidak tersedia di runtime ini — simpan tanpa dimensi.
    }
  }

  const media = await db.cmsMedia.create({
    data: {
      filename: file.name.slice(0, 180) || `berkas${ALLOWED[mime]}`,
      mimeType: mime,
      size: data.byteLength,
      width,
      height,
      alt: String(form?.get("alt") ?? "").slice(0, 200) || file.name.replace(/\.[^.]+$/, ""),
      data: new Uint8Array(data),
    },
    select: { id: true, filename: true, mimeType: true, size: true, width: true, height: true },
  });

  return NextResponse.json({ ok: true, media }, { status: 201 });
}
