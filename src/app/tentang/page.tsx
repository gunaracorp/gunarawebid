import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Landmark, Package, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

export const metadata: Metadata = {
  title: "Tentang — Gugun Gunara, Arsitek Sistem Peradaban Digital",
  description:
    "Profil Gugun Gunara: arsitek Gunara OS (165 dokumen arsitektur kelembagaan), pencipta metodologi UMEA™ — Hukum Minimum Usaha™, G-DOS, dan UWA-7, serta Sekretaris Jenderal MUHDIN Indonesia.",
  alternates: { canonical: "/tentang" },
};

const DNA_FORMULA = ["V", "K", "A", "D", "P", "S", "M", "L", "E"];
/** Makna Formula DNA sesuai dokumen brand — rumus belajar seumur hidup. */
const DNA_LABELS: Record<string, string> = {
  V: "Verifikasi",
  K: "Kuasai",
  A: "Amanah",
  D: "Dikuasai",
  P: "Perduli",
  S: "Sabar",
  M: "Mandekati",
  L: "Lepas",
  E: "Eksistensi",
};

const PERAN = [
  {
    icon: Package,
    peran: "Arsitek Utama",
    nama: "Gunara OS",
    desc: "165 dokumen arsitektur kelembagaan siap pakai dalam 20 domain kepemimpinan (PGA-01 → PGA-165), dari Gunara OS Core hingga Super Organisasi.",
  },
  {
    icon: Building2,
    peran: "The Polymathic Problem Solver",
    nama: "GConsultant",
    desc: "Rumah metodologi UMEA™: asesmen organisasi, struktur fungsi kritis, dan arsitektur dokumentasi untuk organisasi yang ingin naik tingkat.",
  },
  {
    icon: Landmark,
    peran: "Sekretaris Jenderal",
    nama: "MUHDIN Indonesia",
    desc: "Masyarakat Umroh Haji Digital Indonesia — satu ekosistem, satu data, satu standar, satu trust: konektivitas, verifikasi, kolaborasi, integrasi.",
  },
  {
    icon: ShieldCheck,
    peran: "Pengarah Kepatuhan",
    nama: "Pusat Perizinan",
    desc: "Kanal perizinan dan kepatuhan usaha — gerbang pertama sebelum organisasi naik ke arsitektur UMEA™.",
  },
];

export default function TentangPage() {
  return (
    <PublicShell>
      {/* Hero halaman */}
      <section className="relative overflow-hidden bg-[var(--gn-abyss)] pb-16 pt-32 text-[#e6eef8] sm:pb-20 sm:pt-40">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="glow-amber absolute -top-32 left-[-8%] h-[420px] w-[420px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="kicker kicker-on-dark">Tentang · Profil Arsitek</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-5xl">
              Gugun Gunara — <span className="text-gradient-amber">Arsitek</span>, bukan pengisi
              posisi.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#a9bcd6] sm:text-lg">
              Satu orang di balik satu ekosistem: Gunara OS, UMEA™ — Hukum Minimum Usaha™, G-DOS,
              dan UWA-7. Prinsipnya tidak pernah berubah sejak baris pertama:{" "}
              <strong className="font-semibold text-[#e6eef8]">
                struktur sebelum karya, sistem sebelum skala.
              </strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Empat peran */}
      <section aria-labelledby="judul-peran" className="bg-background py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-peran"
            kicker="Empat Peran · Satu Otak"
            title="Di Mana Sistem Itu Hidup"
            description="Setiap peran adalah organ dari satu organismen yang sama — dibangun di atas infrastruktur dan doktrin yang identik."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {PERAN.map((p, i) => (
              <Reveal key={p.nama} delay={(i % 2) * 0.08}>
                <article className="flex h-full gap-5 rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60 hover:shadow-xl hover:shadow-amber-500/5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                    <p.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                      {p.peran.toUpperCase()}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold">{p.nama}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Formula DNA */}
      <section
        aria-labelledby="judul-dna"
        className="border-t border-border bg-secondary/40 py-24 sm:py-28 dark:bg-[#0a1628]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-dna"
            kicker="Formula DNA · Rumus Belajar Seumur Hidup"
            title="Sembilan Huruf yang Menggerakkan Semua"
            description="Urutan yang sama dipakai untuk mempelajari apa pun: dari verifikasi hingga eksistensi. Inilah sistem operasi sang arsitek."
          />
          <Reveal className="mt-14">
            <ol
              className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5"
              aria-label="Formula DNA: Verifikasi, Kuasai, Amanah, Dikuasai, Perduli, Sabar, Mandekati, Lepas, Eksistensi"
            >
              {DNA_FORMULA.map((k, i) => (
                <li key={k} className="flex items-center gap-2.5">
                  <span
                    className="inline-flex min-h-14 min-w-14 flex-col items-center justify-center rounded-xl border border-border bg-card px-3 py-2 text-center shadow-sm"
                    title={DNA_LABELS[k]}
                  >
                    <span className="font-display text-lg font-bold text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]">
                      {k}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {DNA_LABELS[k]}
                    </span>
                  </span>
                  {i < DNA_FORMULA.length - 1 ? (
                    <span className="text-lg text-border" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8">
              <p className="kicker">Etalase Hasil</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "165 dokumen arsitektur kelembagaan — siap pakai, bukan teori",
                  "20 domain kepemimpinan terstruktur PGA-01 → PGA-165",
                  "3 metodologi proprietary: UMEA™ · G-DOS · UWA-7",
                  "6 aset domain digital di atas satu infrastruktur bersama",
                ].map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <BadgeCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]"
                      aria-hidden
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 text-center">
            <Link
              href="/kontak"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-8 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03]"
            >
              Berdiskusi dengan Arsitek
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
