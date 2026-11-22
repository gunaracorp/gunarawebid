import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";

/**
 * POST /api/internal/cms/posts/[id]/publish
 * Body: { action: "publish" | "unpublish" | "schedule", scheduledFor?: string }
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { action?: string; scheduledFor?: string };
  const action = body.action ?? "publish";

  const post = await db.cmsPost.findUnique({ where: { id }, select: { id: true } });
  if (!post) return NextResponse.json({ ok: false, pesan: "Artikel tidak ditemukan." }, { status: 404 });

  if (action === "publish") {
    const updated = await db.cmsPost.update({
      where: { id },
      data: {
        status: "published",
        publishedAt: new Date(),
        scheduledFor: null,
      },
      select: { status: true, publishedAt: true, slug: true },
    });
    return NextResponse.json({ ok: true, post: updated });
  }

  if (action === "schedule") {
    const tgl = body.scheduledFor ? new Date(body.scheduledFor) : null;
    if (!tgl || Number.isNaN(tgl.getTime()) || tgl.getTime() < Date.now() - 60_000) {
      return NextResponse.json(
        { ok: false, pesan: "Waktu jadwal tidak valid — pilih waktu masa depan." },
        { status: 400 }
      );
    }
    const updated = await db.cmsPost.update({
      where: { id },
      data: { status: "scheduled", scheduledFor: tgl, publishedAt: null },
      select: { status: true, scheduledFor: true, slug: true },
    });
    return NextResponse.json({ ok: true, post: updated });
  }

  // unpublish — tarik dari publik tanpa menghapus konten.
  const updated = await db.cmsPost.update({
    where: { id },
    data: { status: "draft" },
    select: { status: true, slug: true },
  });
  return NextResponse.json({ ok: true, post: updated });
}
