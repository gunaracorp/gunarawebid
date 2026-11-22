import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, Eye, ListTree, Tag } from "lucide-react";
import { getPublishedPost, relatedPosts } from "@/lib/cms/queries";
import { db } from "@/lib/db";
import { extractToc } from "@/lib/cms/blocks";
import { BlockRenderer } from "@/components/cms/block-renderer";
import { PublicShell } from "@/components/gunara/site-footer";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPublishedPost(slug).catch(() => null);
  if (!found) return { title: "Artikel tidak ditemukan" };
  const { card } = found;
  const title = card.title;
  const description = card.excerpt || card.subtitle || title;
  return {
    title,
    description,
    keywords: card.tags.map((t) => t.name),
    alternates: { canonical: `/blog/${card.slug}` },
    openGraph: {
      title,
      description,
      url: `https://gunara.web.id/blog/${card.slug}`,
      siteName: "gunara.web.id",
      locale: "id_ID",
      type: "article",
      publishedTime: card.publishedAt?.toISOString(),
      authors: ["Gugun Gunara"],
      images: [{ url: `/api/cms/og/${card.slug}`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/cms/og/${card.slug}`],
    },
  };
}

function tanggalPanjang(d: Date | null): string {
  if (!d) return "";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(d);
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;
  const found = await getPublishedPost(slug).catch(() => null);
  if (!found) notFound();

  const { card, blocks } = found;
  const toc = extractToc(blocks);
  const related = await relatedPosts(card, 3).catch(() => []);

  // Analitik baca — tanpa cookie, tanpa pelacak: satu penghitung per hari.
  try {
    const hari = new Date().toISOString().slice(0, 10);
    await db.cmsPostView.upsert({
      where: { postId_day: { postId: card.id, day: hari } },
      create: { postId: card.id, day: hari, count: 1 },
      update: { count: { increment: 1 } },
    });
    await db.cmsPost.update({ where: { id: card.id }, data: { views: { increment: 1 } } });
  } catch {
    // Analitik tidak boleh mematikan artikel.
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: card.title,
    description: card.excerpt,
    datePublished: card.publishedAt?.toISOString(),
    dateModified: card.updatedAt.toISOString(),
    author: { "@type": "Person", name: "Gugun Gunara", url: "https://gunara.web.id" },
    publisher: { "@type": "Organization", name: "gunara.web.id", url: "https://gunara.web.id" },
    image: `https://gunara.web.id/api/cms/og/${card.slug}`,
    mainEntityOfPage: `https://gunara.web.id/blog/${card.slug}`,
    articleSection: card.categories[0]?.name,
    keywords: card.tags.map((t) => t.name).join(", "),
  };

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Kepala artikel */}
      <header className="border-b border-[#1b3455] bg-[#0a1628]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-[#5c87b8]">
            <Link href="/blog" className="hover:text-[var(--gn-amber-400)]">
              JURNAL
            </Link>
            <span aria-hidden>/</span>
            {card.categories[0] ? (
              <Link href={`/blog?category=${card.categories[0].slug}`} className="hover:text-[var(--gn-amber-400)]">
                {card.categories[0].name.toUpperCase()}
              </Link>
            ) : (
              <span>ARTIKEL</span>
            )}
          </nav>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-[#e6eef8] sm:text-4xl lg:text-[42px]">
            {card.title}
          </h1>
          {card.subtitle ? (
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#a9bcd6]">{card.subtitle}</p>
          ) : null}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#12243d] pt-5 font-mono text-[11px] tracking-[0.14em] text-[#5c87b8]">
            <span className="text-[var(--gn-amber-400)]">GUGUN GUNARA</span>
            <span>{tanggalPanjang(card.publishedAt).toUpperCase()}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              {card.readingMinutes} MENIT BACA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" aria-hidden />
              {card.views.toLocaleString("id-ID")} PEMBACAAN
            </span>
          </div>
        </div>
      </header>

      {/* Sampul */}
      {card.coverMediaId ? (
        <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
          <Image
            src={`/api/cms/media/${card.coverMediaId}`}
            alt={card.title}
            width={1600}
            height={840}
            className="h-auto w-full rounded-3xl border border-[#1b3455] object-cover"
            priority
            unoptimized
          />
        </div>
      ) : null}

      {/* Isi + TOC */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className={cn("mx-auto grid gap-10", toc.length > 0 ? "max-w-6xl xl:grid-cols-[1fr_240px]" : "max-w-3xl")}>
          <article className="min-w-0">
            <BlockRenderer blocks={blocks} />

            {card.tags.length > 0 ? (
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-[#12243d] pt-6">
                <Tag className="h-4 w-4 text-[#5c87b8]" aria-hidden />
                {card.tags.map((t) => (
                  <span
                    key={t.slug}
                    className="rounded-full border border-[#254872] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[#8fa8c6]"
                  >
                    #{t.name.toUpperCase()}
                  </span>
                ))}
              </div>
            ) : null}
          </article>

          {toc.length > 0 ? (
            <aside className="order-first xl:order-none xl:sticky xl:top-28 xl:self-start">
              <nav aria-label="Daftar isi" className="rounded-2xl border border-[#1b3455] bg-[#0a1628] p-5">
                <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.22em] text-[#5c87b8]">
                  <ListTree className="h-3.5 w-3.5" aria-hidden />
                  DAFTAR ISI
                </p>
                <ol className="mt-3.5 space-y-2.5">
                  {toc.map((h) => (
                    <li key={h.anchor}>
                      <a
                        href={`#${h.anchor}`}
                        className="block text-xs leading-relaxed text-[#a9bcd6] transition-colors hover:text-[var(--gn-amber-400)]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}
        </div>
      </div>

      {/* Artikel terkait */}
      {related.length > 0 ? (
        <section className="border-t border-[#1b3455] bg-[#0a1628]/60">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.24em] text-[#5c87b8]">
              LANJUTKAN PEMBACAAN
            </h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-[#1b3455] bg-[#0a1628] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60"
                  >
                    {r.categories[0] ? (
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[var(--gn-amber-400)]">
                        {r.categories[0].name.toUpperCase()}
                      </span>
                    ) : null}
                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-[#e6eef8] group-hover:text-[var(--gn-amber-400)]">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#a9bcd6]">
                      {r.excerpt}
                    </p>
                    <span className="mt-4 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">
                      {r.readingMinutes} MENIT · {tanggalPanjang(r.publishedAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PublicShell>
  );
}
