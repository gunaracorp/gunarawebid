import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";

/** GET /api/internal/cms/media — daftar pustaka media (tanpa data biner). */
export async function GET() {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const media = await db.cmsMedia.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      filename: true,
      mimeType: true,
      size: true,
      width: true,
      height: true,
      alt: true,
      createdAt: true,
    },
    take: 300,
  });
  return NextResponse.json({ ok: true, media });
}
