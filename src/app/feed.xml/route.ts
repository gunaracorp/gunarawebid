import { listPublishedPosts } from "@/lib/cms/queries";

/**
 * GET /feed.xml — RSS 2.0 native tanpa plugin.
 * WordPress perlu plugin untuk feed yang layak; Gunara CMS memilikinya sejak
 * baris pertama, lengkap dengan excerpt dan tautan permanen.
 */
export const dynamic = "force-dynamic";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = "https://gunara.web.id";
  const posts = await listPublishedPosts({ take: 20 }).catch(() => []);

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      const tgl = (p.publishedAt ?? p.updatedAt).toUTCString();
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${tgl}</pubDate>
      <description>${esc(p.excerpt)}</description>
      ${p.categories.map((c) => `<category>${esc(c.name)}</category>`).join("\n      ")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gunara Journal — gunara.web.id</title>
    <link>${base}/blog</link>
    <description>Jurnal arsitek digital Gugun Gunara: metodologi UMEA, G-DOS, UWA-7, sistem, dan peradaban digital.</description>
    <language>id-id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
    },
  });
}
