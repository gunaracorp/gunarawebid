import Link from "next/link";
import { ArrowRight, Compass, Landmark, Map, Microscope, Route } from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";
import { Hero } from "@/components/gunara/hero";
import { Philosophy } from "@/components/gunara/philosophy";
import { ContactCta } from "@/components/gunara/contact-cta";
import { SectionHeading } from "@/components/gunara/section-heading";
import { Reveal } from "@/components/gunara/reveal";

/** Peta situs publik — empat pintu menuju halaman masing-masing. */
const PETA_SITUS = [
  {
    href: "/metodologi",
    icon: Microscope,
    judul: "Metodologi",
    desc: "Tiga metodologi proprietary: UMEA™ — Hukum Minimum Usaha™, sistem operasi G-DOS, dan arsitektur web UWA-7.",
    meta: "UMEA · G-DOS · UWA-7",
  },
  {
    href: "/layanan",
    icon: Compass,
    judul: "Layanan",
    desc: "Lalu lintas kerja sama untuk client: asesmen kematangan organisasi, implementasi G-DOS, hingga arsitektur web UWA-7.",
    meta: "UNTUK CLIENT",
  },
  {
    href: "/ekosistem",
    icon: Landmark,
    judul: "Ekosistem",
    desc: "Satu otak, sebelas organ — peta kendali domain: digiman.id, GConsultant, MUHDIN Indonesia, Pusat Perizinan, KopNusa, Arofah, PPP Digital, dan lainnya.",
    meta: "11 ASET DIGITAL",
  },
  {
    href: "/tentang",
    icon: Route,
    judul: "Tentang",
    desc: "Gugun Gunara — arsitek di balik sistem: peran, prinsip kerja, dan formula DNA yang menggerakkan seluruh ekosistem.",
    meta: "PROFIL ARSITEK",
  },
];

/**
 * gunara.web.id — Personal Command Center of Gugun Gunara.
 * Situs publik multi-halaman: beranda menyajikan narasi inti + peta pintu masuk;
 * setiap topik besar punya halaman tersendiri.
 */
export default function Home() {
  return (
    <PublicShell>
      <Hero />
      <Philosophy />

      <section
        id="peta-situs"
        aria-labelledby="judul-peta-situs"
        className="bg-secondary/40 py-24 sm:py-28 dark:bg-[#060d1f]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="judul-peta-situs"
            kicker="Peta Situs · Empat Pintu"
            title="Masuki Sistem dari Gerbang yang Tepat"
            description="Seluruh materi publik kini tersusun dalam halaman-halaman terpisah — masing-masing dengan fokus tunggal, siap dijelajahi."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PETA_SITUS.map((p, i) => (
              <Reveal key={p.href} delay={i * 0.08}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gn-amber-500)]/60 hover:shadow-xl hover:shadow-amber-500/5"
                  aria-label={`Masuk halaman ${p.judul}`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-[var(--gn-amber-700)] transition-colors group-hover:bg-[var(--gn-amber-500)] group-hover:text-[var(--gn-navy-900)] dark:text-[var(--gn-amber-400)]">
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{p.judul}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center justify-between gap-2 border-t border-border pt-4 font-mono text-[10px] font-semibold tracking-[0.16em] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]">
                    {p.meta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10">
            <p className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-6 py-4 text-center font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted-foreground">
              <Map className="h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
              DOKUMEN INTERNAL &amp; DETAIL IDENTITAS TIDAK DITERBITKAN DI SINI
            </p>
          </Reveal>
          <Reveal delay={0.18} className="mt-6">
            <nav
              aria-label="Dokumen legal dan bantuan"
              className="flex flex-wrap items-center justify-center gap-2.5"
            >
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/privacy", label: "Kebijakan Privasi" },
                { href: "/terms", label: "Syarat & Ketentuan" },
                { href: "/cookies", label: "Kebijakan Cookie" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-[var(--gn-amber-500)]/60 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      <ContactCta />
    </PublicShell>
  );
}
