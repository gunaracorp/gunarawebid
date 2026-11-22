import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { expectedSessionToken, INTERNAL_COOKIE, timingSafeEqual } from "@/lib/internal-auth";
import { cookies } from "next/headers";

/**
 * GET /api/internal/dokumen/[slug] — melayani berkas rahasia vault & aset identitas.
 * Penjagaan dua lapis: middleware + pemeriksaan cookie di handler ini (defense in depth).
 *
 * slug → sumber berkas:
 *  - nib-pt-top-konsultan-internasional → internal-vault/nib-top-konsultan-internasional-ok.pdf
 *  - papan-identitas                    → docs/assets/brand/identity-board.png
 *  - identitas-logo                     → docs/brand/IDENTITAS-LOGO.md
 *  - roadmap                            → ROADMAP.md
 */

const VAULT_FILES: Record<string, { file: string; type: string; nama: string }> = {
  "nib-pt-top-konsultan-internasional": {
    file: path.join(process.cwd(), "internal-vault", "nib-top-konsultan-internasional-ok.pdf"),
    type: "application/pdf",
    nama: "NIB-2812220044643-PT-Top-Konsultan-Internasional.pdf",
  },
  "papan-identitas": {
    file: path.join(process.cwd(), "docs", "assets", "brand", "identity-board.png"),
    type: "image/png",
    nama: "papan-identitas-trilogi-gunara.png",
  },
  "identitas-logo": {
    file: path.join(process.cwd(), "docs", "brand", "IDENTITAS-LOGO.md"),
    type: "text/markdown; charset=utf-8",
    nama: "IDENTITAS-LOGO-GUNARA.md",
  },
  roadmap: {
    file: path.join(process.cwd(), "ROADMAP.md"),
    type: "text/markdown; charset=utf-8",
    nama: "ROADMAP-GUNARA-OS-99-HARI.md",
  },
};

async function sesiValid(): Promise<boolean> {
  const expected = await expectedSessionToken();
  if (!expected) return false;
  const jar = await cookies();
  const cookie = jar.get(INTERNAL_COOKIE)?.value ?? "";
  return cookie.length > 0 && timingSafeEqual(cookie, expected);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entri = VAULT_FILES[slug];
  if (!entri) {
    return NextResponse.json({ ok: false, pesan: "Dokumen tidak dikenal." }, { status: 404 });
  }

  if (!(await sesiValid())) {
    return NextResponse.json(
      { ok: false, pesan: "Akses ditolak — sesi internal tidak valid." },
      { status: 401 }
    );
  }

  try {
    const isi = await readFile(entri.file);
    return new NextResponse(new Uint8Array(isi), {
      status: 200,
      headers: {
        "Content-Type": entri.type,
        "Content-Disposition": `inline; filename="${entri.nama}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        pesan:
          "Berkas vault belum terpasang pada runtime ini. Untuk produksi (Vercel), letakkan berkas di folder internal-vault/ atau hubungkan penyimpanan yang sesuai.",
      },
      { status: 404 }
    );
  }
}
