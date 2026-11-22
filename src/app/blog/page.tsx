import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock3, Eye, Newspaper, Rss, Search } from "lucide-react";
import { listPublishedPosts, listCategories } from "@/lib/cms/queries";
import { PublicShell } from "@/components/gunara/site-footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gunara Journal — Jurnal Arsitek Digital",
  description:
    "Artikel, catatan arsitek, dan pemikiran sistem dari Gugun Gunara: metodologi UMEA, G-DOS, UWA-7, hingga praktik membangun peradaban digital.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
};

export const dynamic = "force-dynamic";

function tanggal(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(d);
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const [posts, categories] = await Promise.all([
    listPublishedPosts({ q, category }).catch(() => []),
    listCategories().catch(() => []),
  ]);

  return (
    <PublicShell>
      {/* Hero jurnal */}
      <section className="border-b border-[#1b3455] bg-[#0a1628]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.24em] text-[var(--gn-amber-400)]">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  GUNARA JOURNAL · LAYER 7
                </p>
                <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                  Jurnal Arsitek Digital
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
                  Catatan lapangan tentang sistem, identitas, dan peradaban digital — ditulis langsung
                  dari mesin konten Gunara CMS, disajikan tanpa perantara.
                </p>
              </div>
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-2 rounded-full border border-[#1b3455] px-4 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
              >
                <Rss className="h-4 w-4" aria-hidden />
                RSS FEED
              </a>
            </div>

            {/* Pencarian + filter kategori */}
            <form action="/blog" method="get" className="mt-8 flex flex-wrap items-center gap-3">
              <div className="relative min-w-64 flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c87b8]" aria-hidden />
                <input
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Cari artikel…"
                  className="w-full rounded-full border border-[#254872] bg-[#060d1f] py-2.5 pl-10 pr-4 text-sm text-[#e6eef8] placeholder:text-[#3d5f8a] focus:border-[var(--gn-amber-500)]/60 focus:outline-none"
                />
                {q ? <input type="hidden" name="category" value={category ?? ""} /> : null}
              </div>
            </form>
            <nav aria-label="Filter kategori" className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] transition-colors",
                  !category
                    ? "border-[var(--gn-amber-500)]/60 bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)] text-[var(--gn-amber-400)]"
                    : "border-[#254872] text-[#5c87b8] hover:text-[#a9bcd6]"
                )}
              >
                SEMUA
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog?category=${c.slug}`}
                  className={cn(
                    "rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] transition-colors",
                    category === c.slug
                      ? "border-[var(--gn-amber-500)]/60 bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)] text-[var(--gn-amber-400)]"
                      : "border-[#254872] text-[#5c87b8] hover:text-[#a9bcd6]"
                  )}
                >
                  {c.name.toUpperCase()}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* Grid artikel */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#254872] bg-[#0a1628] px-6 py-20 text-center">
              <Newspaper className="mx-auto h-12 w-12 text-[#254872]" aria-hidden />
              <p className="mt-5 text-lg font-semibold text-[#e6eef8]">
                {q || category ? "Tidak ada artikel yang cocok." : "Jurnal belum dibuka."}
              </p>
              <p className="mt-2 text-sm text-[#a9bcd6]">
                {q || category
                  ? "Coba kata kunci atau kategori lain."
                  : "Artikel pertama akan terbit di sini — ditulis langsung dari Gunara CMS."}
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1b3455] bg-[#0a1628] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--gn-amber-500)]/60"
                  >
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#0d1f3d] via-[#0a1628] to-[#060d1f]">
                      {p.coverMediaId ? (
                        <Image
                          src={`/api/cms/media/${p.coverMediaId}`}
                          alt={p.title}
                          width={640}
                          height={360}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-6xl font-bold text-[#12243d] transition-colors group-hover:text-[#1b3455]">
                            {p.title.charAt(0)}
                          </span>
                        </span>
                      )}
                      {p.categories[0] ? (
                        <span className="absolute left-4 top-4 rounded-full border border-[var(--gn-amber-500)]/50 bg-[#060d1f]/85 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-[var(--gn-amber-400)]">
                          {p.categories[0].name.toUpperCase()}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-lg font-bold leading-snug text-[#e6eef8] group-hover:text-[var(--gn-amber-400)]">
                        {p.title}
                      </h2>
                      {p.subtitle ? (
                        <p className="mt-1.5 line-clamp-1 text-sm italic text-[#8fa8c6]">{p.subtitle}</p>
                      ) : null}
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#a9bcd6]">
                        {p.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-[#12243d] pt-4 font-mono text-[10px] tracking-[0.12em] text-[#5c87b8]">
                        <span className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3 w-3" aria-hidden />
                            {p.readingMinutes} MNT
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Eye className="h-3 w-3" aria-hidden />
                            {p.views.toLocaleString("id-ID")}
                          </span>
                        </span>
                        <span>{tanggal(p.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
    </PublicShell>
  );
}
