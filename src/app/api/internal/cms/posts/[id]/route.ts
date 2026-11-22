import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sesiInternalValid } from "@/lib/cms/guard";
import { parseBlocks, serializeBlocks } from "@/lib/cms/blocks";
import {
  ensureCategories,
  ensureTags,
  prepareBlocksForSave,
  setPostTaxonomy,
} from "@/lib/cms/queries";
import { unikSlug } from "@/lib/cms/slug";

const MAX_REVISI = 20;

/** GET /api/internal/cms/posts/[id] — satu artikel lengkap (untuk editor). */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  const post = await db.cmsPost.findUnique({
    where: { id },
    include: {
      categories: { select: { categoryId: true } },
      tags: { select: { tag: true } },
    },
  });
  if (!post) return NextResponse.json({ ok: false, pesan: "Artikel tidak ditemukan." }, { status: 404 });
  return NextResponse.json({
    ok: true,
    post: {
      ...post,
      blocks: parseBlocks(post.blocks),
      tags: post.tags.map((t) => t.tag.name),
    },
  });
}

/** PATCH /api/internal/cms/posts/[id] — simpan perubahan + snapshot revisi. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  const existing = await db.cmsPost.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ ok: false, pesan: "Artikel tidak ditemukan." }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, pesan: "Payload tidak valid." }, { status: 400 });

  // Snapshot revisi bila konten benar-benar berubah.
  const blokBaruJson =
    Array.isArray(body.blocks) ? serializeBlocks(body.blocks) : existing.blocks;
  const kontenBerubah = blokBaruJson !== existing.blocks || existing.title !== (typeof body.title === "string" ? body.title : existing.title);
  if (kontenBerubah && existing.blocks !== "[]") {
    await db.cmsRevision.create({
      data: {
        postId: id,
        title: existing.title,
        snapshot: JSON.stringify({
          title: existing.title,
          blocks: parseBlocks(existing.blocks),
        }),
        note: "Sebelum penyimpanan terbaru",
      },
    });
    const jumlah = await db.cmsRevision.count({ where: { postId: id } });
    if (jumlah > MAX_REVISI) {
      const dibuang = await db.cmsRevision.findMany({
        where: { postId: id },
        orderBy: { createdAt: "asc" },
        take: jumlah - MAX_REVISI,
        select: { id: true },
      });
      await db.cmsRevision.deleteMany({ where: { id: { in: dibuang.map((r) => r.id) } } });
    }
  }

  const { json, readingMinutes } = prepareBlocksForSave(Array.isArray(body.blocks) ? body.blocks : parseBlocks(existing.blocks));
  const judul = typeof body.title === "string" && body.title.trim() ? body.title.trim() : existing.title;

  let slug = existing.slug;
  if (typeof body.slug === "string" && body.slug.trim() && body.slug.trim() !== existing.slug) {
    slug = await unikSlug(body.slug, id);
  }

  const post = await db.cmsPost.update({
    where: { id },
    data: {
      title: judul,
      slug,
      subtitle: typeof body.subtitle === "string" ? body.subtitle.trim() : null,
      excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : null,
      coverMediaId: typeof body.coverMediaId === "string" && body.coverMediaId ? body.coverMediaId : null,
      blocks: json,
      readingMinutes,
      seoTitle: typeof body.seoTitle === "string" && body.seoTitle.trim() ? body.seoTitle.trim() : null,
      seoDescription:
        typeof body.seoDescription === "string" && body.seoDescription.trim()
          ? body.seoDescription.trim()
          : null,
      seoKeywords:
        typeof body.seoKeywords === "string" && body.seoKeywords.trim()
          ? body.seoKeywords.trim()
          : null,
      status: typeof body.status === "string" && body.status ? body.status : existing.status,
      scheduledFor: body.scheduledFor ? new Date(String(body.scheduledFor)) : existing.scheduledFor,
    },
    select: { id: true, slug: true, status: true },
  });

  // Taksonomi opsional pada payload yang sama.
  if (Array.isArray(body.categories) || Array.isArray(body.tags)) {
    const catIds = await ensureCategories(
      Array.isArray(body.categories) ? body.categories.map(String) : []
    );
    const tagIds = await ensureTags(Array.isArray(body.tags) ? body.tags.map(String) : []);
    await setPostTaxonomy(id, catIds, tagIds);
  }

  return NextResponse.json({ ok: true, post });
}

/** DELETE /api/internal/cms/posts/[id] — hapus artikel beserta revisinya. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await sesiInternalValid())) {
    return NextResponse.json({ ok: false, pesan: "Sesi internal tidak valid." }, { status: 401 });
  }
  const { id } = await params;
  await db.cmsPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
