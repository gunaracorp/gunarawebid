import type { MetadataRoute } from "next";

/**
 * Lapisan Ilmu (UWA-7): peta situs untuk mesin pencari.
 * Hanya rute publik — area internal (/internal/*) sengaja tidak pernah
 * dimasukkan ke sitemap dan diblokir robots.txt.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gunara.web.id";
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
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

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
