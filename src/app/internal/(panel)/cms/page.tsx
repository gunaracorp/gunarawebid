import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, Images, Plus, Newspaper, Eye } from "lucide-react";
import { cmsStats, listAllPosts } from "@/lib/cms/queries";
import { STATUS_LABEL } from "@/lib/cms/blocks";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CMS — Ruang Redaksi",
};

export const dynamic = "force-dynamic";

export default async function CmsDashboardPage() {
  const [posts, stats] = await Promise.all([
    listAllPosts().catch(() => []),
    cmsStats().catch(() => ({ total: 0, terbit: 0, draf: 0, terjadwal: 0, totalViews: 0, media: 0 })),
  ]);

  const STATUS = [
    { label: "Artikel", nilai: String(stats.total), note: "TOTAL SELURUHNYA" },
    { label: "Terbit", nilai: String(stats.terbit), note: "LIVE DI SITUS PUBLIK" },
    { label: "Draf & Ulasan", nilai: String(stats.draf), note: "MENUNGGU KALAM" },
    { label: "Pembacaan", nilai: stats.totalViews.toLocaleString("id-ID"), note: "TANPA COOKIE" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]">
              <Newspaper className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Gunara CMS — Ruang Redaksi</h1>
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#5c87b8]">
                MESIN KONTEN BLOK-NATIVE · 14 TIPE BLOK · REVISI OTOMATIS · SEO & OG DINAMIS
              </p>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Link
              href="/internal/cms/media"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#254872] px-4 text-sm font-medium text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
            >
              <Images className="h-4 w-4" aria-hidden />
              Pustaka Media
            </Link>
            <Link
              href="/internal/cms/tulis"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-5 font-display text-sm font-bold text-[#060d1f] transition-transform hover:scale-[1.03]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Tulis
            </Link>
          </div>
        </div>
        <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#1b3455] bg-[#1b3455] lg:grid-cols-4">
          {STATUS.map((s) => (
            <div key={s.label} className="flex flex-col bg-[#060d1f] px-6 py-6">
              <dt className="order-2 mt-1 text-xs text-[#a9bcd6]">{s.label}</dt>
              <dd className="order-1 font-display text-2xl font-bold text-[var(--gn-amber-400)]">{s.nilai}</dd>
              <dd className="order-3 mt-0.5 font-mono text-[10px] tracking-[0.14em] text-[#5c87b8]">{s.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Tabel artikel */}
      <section aria-labelledby="judul-artikel">
        <div className="flex items-center justify-between">
          <h2 id="judul-artikel" className="font-mono text-[11px] font-bold tracking-[0.24em] text-[#5c87b8]">
            SELURUH ARTIKEL
          </h2>
          <span className="font-mono text-[10px] text-[#5c87b8]">{stats.media} ASET MEDIA</span>
        </div>

        {posts.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-dashed border-[#254872] bg-[#0a1628] px-6 py-14 text-center">
            <FileText className="mx-auto h-10 w-10 text-[#254872]" aria-hidden />
            <p className="mt-4 text-sm text-[#a9bcd6]">Belum ada artikel. Kanvas pertama menanti kalam Anda.</p>
            <Link
              href="/internal/cms/tulis"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-5 py-2.5 font-display text-sm font-bold text-[#060d1f]"
            >
              <Plus className="h-4 w-4" /> Tulis artikel pertama
            </Link>
          </div>
        ) : (
          <div className="nice-scroll mt-4 overflow-x-auto rounded-3xl border border-[#1b3455]">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#0a1628]">
                  {["Artikel", "Status", "Kategori", "Dibaca", "Terakhir"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-[#1b3455] px-5 py-3.5 text-left font-mono text-[10px] font-bold tracking-[0.18em] text-[#5c87b8]"
                    >
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => {
                  const st = STATUS_LABEL[p.status] ?? STATUS_LABEL.draft;
                  return (
                    <tr key={p.id} className="odd:bg-[#060d1f] even:bg-[#081223] transition-colors hover:bg-[#0a1628]">
                      <td className="max-w-md px-5 py-4">
                        <Link href={`/internal/cms/${p.id}`} className="group block">
                          <span className="block truncate font-semibold text-[#e6eef8] group-hover:text-[var(--gn-amber-400)]">
                            {p.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[10px] text-[#5c87b8]">
                            /blog/{p.slug} · {p.readingMinutes} MENIT
                          </span>
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <span className={cn("inline-block rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em]", st.tone)}>
                          {st.label.toUpperCase()}
                        </span>
                        {p.status === "scheduled" && p.scheduledFor ? (
                          <span className="mt-1 block font-mono text-[10px] text-[#5c87b8]">
                            {new Date(p.scheduledFor).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                          </span>
                        ) : null}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#a9bcd6]">
                        {p.categories.map((c) => c.name).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#a9bcd6]">
                          <Eye className="h-3.5 w-3.5 text-[#5c87b8]" />
                          {p.views.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#8fa8c6]">
                            {new Date(p.updatedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                          </span>
                          {p.status === "published" ? (
                            <a
                              href={`/blog/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Buka ${p.title} di situs publik`}
                              className="rounded-lg p-1.5 text-[#5c87b8] hover:text-[var(--gn-amber-400)]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
