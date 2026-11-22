import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Compass,
  GaugeCircle,
  Layers,
  PenTool,
  Repeat,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

export const metadata: Metadata = {
  title: "Layanan — Jalur Kerja Sama untuk Client",
  description:
    "Layanan Gunara untuk client: asesmen kematangan organisasi UMEA™ (indeks UMEA-03 hingga UMEA-21), implementasi sistem operasi digital G-DOS (165 dokumen, 20 domain), arsitektur web UWA-7, dan jalur kepatuhan usaha.",
  alternates: { canonical: "/layanan" },
};

const LAYANAN = [
  {
    icon: GaugeCircle,
    kode: "UMEA™",
    judul: "Asesmen Kematangan Organisasi",
    desc: "Organisasi Anda dipetakan ke indeks kematangan UMEA™ — dari UMEA-03 (Sel Survival) hingga UMEA-21 (Organisasi Tangguh). Kami mengukur 21 fungsi kritis dalam 7 kategori, menguji tiga hukum besar (cakupan fungsional, pemisahan konflik, kontinuitas), lalu menyusun rencana naik tingkat yang realistis.",
    output: ["Indeks kematangan awal & target", "Peta 21 fungsi kritis + penanggung jawab", "Rencana naik tingkat bertahap"],
    tone: "light" as const,
  },
  {
    icon: Workflow,
    kode: "G-DOS",
    judul: "Implementasi Sistem Operasi Digital",
    desc: "Satu otak, satu sumber kebenaran. Enam lapis tumpukan G-DOS dipasang di organisasi Anda: Knowledge, Work, Assets, System, Data, dan Control — dengan paket dokumen arsitektur kelembagaan dari D-10 (Minimum Launch Pack) hingga D-165 (Institutional Architecture) dalam 20 domain kepemimpinan.",
    output: ["Stack G-DOS terpasang end-to-end", "Paket dokumen D-10 → D-165 sesuai skala", "Standard operasi & tata kelola tertulis"],
    tone: "dark" as const,
  },
  {
    icon: Layers,
    kode: "UWA-7",
    judul: "Arsitektur Web Tujuh Lapis",
    desc: "Website bukan proyek yang dibuang setelah rilis — ia organisme yang berevolusi. UWA-7 membangun website Anda di atas tujuh lapis peradaban digital, dengan Single Source of Truth, performa dan aksesibilitas yang diuji, serta struktur yang siap tumbuh puluhan tahun.",
    output: ["Website yang hidup & terukur", "Struktur konten yang bisa di-crawl", "Fondasi multi-domain tanpa duplikasi"],
    tone: "light" as const,
  },
  {
    icon: ShieldCheck,
    kode: "KEPATUHAN",
    judul: "Perizinan & Kepatuhan Usaha",
    desc: "Gerbang pertama sebelum naik ke arsitektur UMEA™: perizinan berusaha dan kepatuhan dasar dituntaskan lewat jalur Pusat Perizinan (pusatperizinan.com) — sehingga fondasi legal Anda berdiri sebelum sistem dibangun di atasnya.",
    output: ["Jalur perizinan usaha yang jelas", "Fondasi legal untuk organisasi formal", "Pintu masuk ekosistem Gunara"],
    tone: "dark" as const,
  },
];

const ALUR = [
  {
    n: "01",
    icon: Compass,
    judul: "Pemetaan",
    body: "Diagnosa kondisi nyata — bukan asumsi. Indeks awal ditetapkan sebagai garis dasar yang semua kemajuan dibandingkan dengannya.",
  },
  {
    n: "02",
    icon: PenTool,
    judul: "Arsitektur",
    body: "Desain struktur minimum yang tepat: kompleksitas yang Anda butuhkan — tidak lebih, tidak kurang. Struktur sebelum karya.",
  },
  {
    n: "03",
    icon: ClipboardCheck,
    judul: "Eksekusi",
    body: "Dokumen, sistem, dan website dibangun di atas arsitektur yang sudah dikunci. Setiap hasil punya pemilik dan standar.",
  },
  {
    n: "04",
    icon: Repeat,
    judul: "Evolusi",
    body: "Review siklis: indeks naik, organisme belajar. Kemitraan tidak berhenti di serah terima — ia hidup seperti sistemnya.",
  },
];

export default function LayananPage() {
  return (
    <PublicShell>
      {/* Hero halaman */}
      <section className="relative overflow-hidden bg-[var(--gn-abyss)] pb-16 pt-32 text-[#e6eef8] sm:pb-20 sm:pt-40">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="glow-amber absolute -top-32 right-[-8%] h-[420px] w-[420px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="kicker kicker-on-dark">Layanan · Jalur Kerja Sama</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              Struktur dulu, <span className="text-gradient-amber">baru karya</span> — begitu pula
              kerja sama kita.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
              Empat jalur layanan di atas satu fondasi yang sama. Setiap kemitraan dimulai dari
              pemetaan, bukan tebakan — dan setiap hasil akhir punya standar yang bisa diuji.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Kartu layanan */}
      <section aria-labelledby="judul-layanan" className="bg-background py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-layanan"
            kicker="Empat Jalur Layanan"
            title="Pilih Titik Masuk yang Tepat"
            description="Organisasi diberi hanya kompleksitas yang ia butuhkan. Jalur yang tepat ditentukan lewat asesmen — bukan paket paling mahal."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {LAYANAN.map((l, i) => (
              <Reveal key={l.kode} delay={(i % 2) * 0.08}>
                <article
                  className={
                    l.tone === "dark"
                      ? "flex h-full flex-col rounded-3xl border border-[#1b3455] bg-[#0a1628] p-7 text-[#e6eef8]"
                      : "flex h-full flex-col rounded-3xl border border-border bg-card p-7"
                  }
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={
                        l.tone === "dark"
                          ? "inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#1b3455] bg-[#060d1f] text-[var(--gn-amber-400)]"
                          : "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]"
                      }
                    >
                      <l.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span
                      className={
                        l.tone === "dark"
                          ? "rounded-full border border-[#254872] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-[var(--gn-amber-400)]"
                          : "rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold tracking-[0.18em] text-accent-foreground"
                      }
                    >
                      {l.kode}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">{l.judul}</h3>
                  <p
                    className={
                      l.tone === "dark"
                        ? "mt-3 flex-1 text-sm leading-relaxed text-[#a9bcd6]"
                        : "mt-3 flex-1 text-sm leading-relaxed text-muted-foreground"
                    }
                  >
                    {l.desc}
                  </p>
                  <ul
                    className={
                      l.tone === "dark"
                        ? "mt-5 space-y-2 border-t border-[#1b3455] pt-5"
                        : "mt-5 space-y-2 border-t border-border pt-5"
                    }
                    aria-label={`Hasil yang diterima dari layanan ${l.judul}`}
                  >
                    {l.output.map((o) => (
                      <li
                        key={o}
                        className={
                          l.tone === "dark"
                            ? "flex items-start gap-2.5 text-sm text-[#e6eef8]"
                            : "flex items-start gap-2.5 text-sm"
                        }
                      >
                        <BadgeCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]"
                          aria-hidden
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alur kerja */}
      <section
        aria-labelledby="judul-alur"
        className="border-t border-border bg-secondary/40 py-24 sm:py-28 dark:bg-[#0a1628]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-alur"
            kicker="Alur Kerja · Empat Langkah"
            title="Dari Pemetaan menuju Evolusi"
            description="Satu siklus yang sama untuk semua jalur — karena sistem yang baik selalu dibangun dengan urutan yang benar."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ALUR.map((a, i) => (
              <Reveal key={a.n} delay={i * 0.08}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]">
                      {a.n}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                      <a.icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{a.judul}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-tint)] p-8 text-center dark:bg-[var(--gn-amber-500)]/5">
              <p className="font-mono text-[11px] font-bold tracking-[0.22em] text-[var(--gn-amber-800)] dark:text-[var(--gn-amber-300)]">
                PRINSIP KERJA SAMA
              </p>
              <p className="text-lg font-semibold leading-relaxed text-[var(--gn-navy-900)] dark:text-[#e6eef8]">
                &ldquo;Kompleksitas yang Anda butuhkan — tidak lebih.&rdquo;
              </p>
              <Link
                href="/kontak"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-8 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
              >
                Mulai dari Pemetaan
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
