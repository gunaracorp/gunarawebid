/**
 * Gunara CMS — lapisan query server.
 * Semua akses database konten lewat sini supaya aturan publikasi, penjadwalan,
 * dan taksonomi konsisten di situs publik, feed, sitemap, dan API headless.
 */
import { db } from "@/lib/db";
import {
  computeReadingMinutes,
  deriveExcerpt,
  parseBlocks,
  serializeBlocks,
  slugify,
  type Block,
} from "@/lib/cms/blocks";

/** Arti "terlihat publik": berstatus published ATAU terjadwal dan waktunya tiba. */
export const VISIBILITAS_PUBLIK = {
  OR: [
    { status: "published" },
    { status: "scheduled", scheduledFor: { lte: new Date() } },
  ],
} as const;

/**
 * Lazy-cron: artikel berstatus "scheduled" yang waktunya sudah tiba otomatis
 * dinaikkan menjadi published saat pertama kali dibaca. Tanpa cron, tanpa
 * server tambahan — penjadwalan tetap presisi.
 */
export async function publishDuePosts(): Promise<void> {
  try {
    const now = new Date();
    const due = await db.cmsPost.findMany({
      where: { status: "scheduled", scheduledFor: { lte: now } },
      select: { id: true },
    });
    if (due.length === 0) return;
    await db.cmsPost.updateMany({
      where: { id: { in: due.map((d) => d.id) } },
      data: { status: "published", publishedAt: now },
    });
  } catch {
    // Database tidak tersedia di runtime ini — situs tetap hidup.
  }
}

const POST_CARD_SELECT = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  excerpt: true,
  blocks: true,
  readingMinutes: true,
  views: true,
  publishedAt: true,
  status: true,
  scheduledFor: true,
  updatedAt: true,
  coverMediaId: true,
  categories: { select: { category: { select: { slug: true, name: true } } } },
  tags: { select: { tag: { select: { slug: true, name: true } } } },
} as const;

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  readingMinutes: number;
  views: number;
  publishedAt: Date | null;
  status: string;
  scheduledFor: Date | null;
  updatedAt: Date;
  coverMediaId: string | null;
  categories: { slug: string; name: string }[];
  tags: { slug: string; name: string }[];
};

function toCard(row: {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  blocks: string;
  readingMinutes: number;
  views: number;
  publishedAt: Date | null;
  status: string;
  scheduledFor: Date | null;
  updatedAt: Date;
  coverMediaId: string | null;
  categories: { category: { slug: string; name: string } }[];
  tags: { tag: { slug: string; name: string } }[];
}): PostCard {
  const blocks = parseBlocks(row.blocks);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: deriveExcerpt(blocks, row.excerpt ?? ""),
    readingMinutes: row.readingMinutes || computeReadingMinutes(blocks),
    views: row.views,
    publishedAt: row.publishedAt,
    status: row.status,
    scheduledFor: row.scheduledFor,
    updatedAt: row.updatedAt,
    coverMediaId: row.coverMediaId,
    categories: row.categories.map((c) => c.category),
    tags: row.tags.map((t) => t.tag),
  };
}

/** Daftar artikel publik untuk /blog — dengan pencarian & filter kategori. */
export async function listPublishedPosts(opts: {
  q?: string;
  category?: string;
  take?: number;
} = {}): Promise<PostCard[]> {
  await publishDuePosts();
  const where = {
    ...VISIBILITAS_PUBLIK,
    ...(opts.q
      ? {
          OR: [
            { title: { contains: opts.q } },
            { subtitle: { contains: opts.q } },
            { excerpt: { contains: opts.q } },
          ],
        }
      : {}),
    ...(opts.category
      ? { categories: { some: { category: { slug: opts.category } } } }
      : {}),
  };
  const rows = await db.cmsPost.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    select: POST_CARD_SELECT,
    take: opts.take ?? 60,
  });
  return rows.map(toCard);
}

export async function getPublishedPost(slug: string): Promise<{
  card: PostCard;
  blocks: Block[];
} | null> {
  await publishDuePosts();
  const row = await db.cmsPost.findFirst({
    where: { slug, ...VISIBILITAS_PUBLIK },
    select: POST_CARD_SELECT,
  });
  if (!row) return null;
  return { card: toCard(row), blocks: parseBlocks(row.blocks) };
}

/** Semua artikel untuk dashboard internal (termasuk draf). */
export async function listAllPosts(take = 200): Promise<PostCard[]> {
  const rows = await db.cmsPost.findMany({
    orderBy: [{ updatedAt: "desc" }],
    select: POST_CARD_SELECT,
    take,
  });
  return rows.map(toCard);
}

export async function getPostById(id: string) {
  return db.cmsPost.findUnique({
    where: { id },
    include: {
      categories: { select: { categoryId: true } },
      tags: { select: { tag: { slug: true, name: true } } },
    },
  });
}

/** Artikel terkait: prioritas kategori bersama, lalu terbaru. */
export async function relatedPosts(current: PostCard, take = 3): Promise<PostCard[]> {
  const catSlugs = current.categories.map((c) => c.slug);
  const rows = await db.cmsPost.findMany({
    where: {
      ...VISIBILITAS_PUBLIK,
      id: { not: current.id },
      ...(catSlugs.length > 0
        ? { categories: { some: { category: { slug: { in: catSlugs } } } } }
        : {}),
    },
    orderBy: [{ publishedAt: "desc" }],
    select: POST_CARD_SELECT,
    take: take + 4,
  });
  const cards = rows.map(toCard).filter((r) => r.slug !== current.slug);
  if (cards.length >= take) return cards.slice(0, take);
  const filler = await db.cmsPost.findMany({
    where: { ...VISIBILITAS_PUBLIK, id: { notIn: [current.id, ...cards.map((c) => c.id)] } },
    orderBy: [{ publishedAt: "desc" }],
    select: POST_CARD_SELECT,
    take,
  });
  return [...cards, ...filler.map(toCard)].slice(0, take);
}

// ── Taksonomi ────────────────────────────────────────────────────────────────

export async function ensureCategories(names: string[]): Promise<string[]> {
  const ids: string[] = [];
  for (const raw of names) {
    const name = raw.trim();
    if (!name) continue;
    const slug = slugify(name);
    if (!slug) continue;
    const cat = await db.cmsCategory.upsert({
      where: { slug },
      create: { slug, name },
      update: {},
    });
    ids.push(cat.id);
  }
  return ids;
}

export async function ensureTags(names: string[]): Promise<string[]> {
  const ids: string[] = [];
  for (const raw of names) {
    const name = raw.trim();
    if (!name) continue;
    const slug = slugify(name);
    if (!slug) continue;
    const tag = await db.cmsTag.upsert({
      where: { slug },
      create: { slug, name },
      update: {},
    });
    ids.push(tag.id);
  }
  return ids;
}

export async function setPostTaxonomy(
  postId: string,
  categoryIds: string[],
  tagIds: string[]
): Promise<void> {
  // SQLite tidak mendukung skipDuplicates — deduplikasi manual sebelum insert.
  const cats = Array.from(new Set(categoryIds));
  const tags = Array.from(new Set(tagIds));
  await db.$transaction([
    db.cmsPostCategory.deleteMany({ where: { postId } }),
    db.cmsPostTag.deleteMany({ where: { postId } }),
    db.cmsPostCategory.createMany({
      data: cats.map((categoryId) => ({ postId, categoryId })),
    }),
    db.cmsPostTag.createMany({
      data: tags.map((tagId) => ({ postId, tagId })),
    }),
  ]);
}

export async function listCategories() {
  return db.cmsCategory.findMany({ orderBy: { name: "asc" } });
}

// ── Statistik dashboard ──────────────────────────────────────────────────────

export async function cmsStats() {
  const [total, terbit, draf, terjadwal, totalViews, media] = await Promise.all([
    db.cmsPost.count(),
    db.cmsPost.count({ where: { status: "published" } }),
    db.cmsPost.count({ where: { status: "draft" } }),
    db.cmsPost.count({ where: { status: "scheduled" } }),
    db.cmsPost.aggregate({ _sum: { views: true } }),
    db.cmsMedia.count(),
  ]);
  return {
    total,
    terbit,
    draf,
    terjadwal,
    totalViews: totalViews._sum.views ?? 0,
    media,
  };
}

/** Penyimpanan blok seragam: array runtime → JSON bersih + waktu baca. */
export function prepareBlocksForSave(blocks: unknown[]): {
  json: string;
  readingMinutes: number;
} {
  const json = serializeBlocks(blocks);
  const parsed = parseBlocks(json);
  return { json, readingMinutes: computeReadingMinutes(parsed) };
}
