import { NextResponse } from "next/server";
import { listPublishedPosts } from "@/lib/cms/queries";

/**
 * GET /api/cms/posts — API headless publik (JSON).
 * Hanya artikel terbit. Untuk konsumsi ekosistem 11 situs Gunara dan
 * integrasi pihak ketiga — tanpa kunci, tanpa rahasia, data publik saja.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const category = url.searchParams.get("category") ?? undefined;
  const takeRaw = Number(url.searchParams.get("take") ?? 20);
  const take = Number.isFinite(takeRaw) ? Math.min(Math.max(takeRaw, 1), 50) : 20;

  const posts = await listPublishedPosts({ q, category, take }).catch(() => []);

  return NextResponse.json(
    {
      ok: true,
      service: "gunara-cms",
      count: posts.length,
      posts: posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        excerpt: p.excerpt,
        readingMinutes: p.readingMinutes,
        views: p.views,
        publishedAt: p.publishedAt,
        url: `https://gunara.web.id/blog/${p.slug}`,
        categories: p.categories,
        tags: p.tags,
      })),
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    }
  );
}
