import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";
import { parseBlocks, serializeBlocks, computeReadingMinutes } from "@/lib/cms/blocks";

/** GET /api/internal/cms/posts/[id]/revisions — riwayat snapshot. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  const revisions = await db.cmsRevision.findMany({
    where: { postId: id },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, note: true, createdAt: true },
  });
  return NextResponse.json({ ok: true, revisions });
}

/** POST — pulihkan snapshot: body { revisionId }. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { revisionId?: string };
  if (!body.revisionId) {
    return NextResponse.json({ ok: false, pesan: "revisionId wajib." }, { status: 400 });
  }
  const rev = await db.cmsRevision.findFirst({
    where: { id: body.revisionId, postId: id },
  });
  if (!rev) return NextResponse.json({ ok: false, pesan: "Revisi tidak ditemukan." }, { status: 404 });

  const snap = parseBlocks(rev.snapshot);
  const json = serializeBlocks(snap);
  const readingMinutes = computeReadingMinutes(snap);

  // Sebelum dipulihkan, kondisi sekarang di-snapshot dulu (bisa dibatalkan).
  const current = await db.cmsPost.findUnique({
    where: { id },
    select: { title: true, blocks: true },
  });
  if (current) {
    await db.cmsRevision.create({
      data: {
        postId: id,
        title: current.title,
        snapshot: JSON.stringify({ title: current.title, blocks: parseBlocks(current.blocks) }),
        note: "Sebelum pemulihan revisi",
      },
    });
  }

  await db.cmsPost.update({
    where: { id },
    data: { title: rev.title, blocks: json, readingMinutes },
  });
  return NextResponse.json({ ok: true, restored: rev.id, title: rev.title });
}
