import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { VISIBILITAS_PUBLIK } from "@/lib/cms/queries";

/**
 * Lapisan Ilmu (UWA-7): peta situs untuk mesin pencari.
 * Rute statis publik + seluruh artikel terbit dari Gunara CMS.
 * Area internal (/internal/*) sengaja tidak pernah masuk sitemap dan
 * diblokir robots.txt.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://gunara.web.id";
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/metodologi", priority: 0.9, changeFrequency: "monthly" },
    { path: "/layanan", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ekosistem", priority: 0.9, changeFrequency: "monthly" },
    { path: "/tentang", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kontak", priority: 0.8, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.4, changeFrequency: "yearly" },
  ];

  const statis = routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Artikel dari Gunara CMS — database tidak tersedia di runtime ini? Tetap hidup.
  let dinamis: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.cmsPost.findMany({
      where: VISIBILITAS_PUBLIK,
      orderBy: { publishedAt: "desc" },
      select: { slug: true, updatedAt: true },
      take: 500,
    });
    dinamis = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Abaikan — sitemap statis tetap dilayani.
  }

  return [...statis, ...dinamis];
}
