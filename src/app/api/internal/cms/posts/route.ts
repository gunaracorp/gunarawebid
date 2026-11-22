import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";
import { unikSlug } from "@/lib/cms/slug";

/** GET /api/internal/cms/posts — daftar seluruh artikel (termasuk draf). */
export async function GET() {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const rows = await db.cmsPost.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      views: true,
      publishedAt: true,
      scheduledFor: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ ok: true, posts: rows });
}

/** POST /api/internal/cms/posts — buat artikel baru (draf kosong). */
export async function POST(req: Request) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  if (!title) {
    return NextResponse.json({ ok: false, pesan: "Judul wajib diisi." }, { status: 400 });
  }
  const slug = await unikSlug(
    typeof body?.slug === "string" && body.slug.trim() ? body.slug : title
  );
  const post = await db.cmsPost.create({
    data: {
      title,
      slug,
      subtitle: typeof body?.subtitle === "string" ? body.subtitle.trim() : null,
      blocks: "[]",
      status: "draft",
      authorName: "Gugun Gunara",
    },
    select: { id: true, slug: true },
  });
  return NextResponse.json({ ok: true, post }, { status: 201 });
}
