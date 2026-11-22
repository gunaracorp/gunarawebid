import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/cms/media/[id] — penyaji aset pustaka media (publik, aman: hanya
 * gambar yang diunggah lewat gerbang internal). Cache permanen karena id
 * konten tidak berubah (immutable content addressing by id).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = await db.cmsMedia
    .findUnique({ where: { id }, select: { mimeType: true, data: true, filename: true } })
    .catch(() => null);
  if (!media) {
    return NextResponse.json({ ok: false, pesan: "Aset tidak ditemukan." }, { status: 404 });
  }
  const nama = media.filename.replace(/"/g, "");
  return new NextResponse(new Uint8Array(media.data), {
    status: 200,
    headers: {
      "Content-Type": media.mimeType,
      "Content-Disposition": `inline; filename="${nama}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
