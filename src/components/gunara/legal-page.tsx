import Link from "next/link";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { PublicShell } from "@/components/gunara/site-footer";
import { Reveal } from "@/components/gunara/reveal";
import { OPERATOR, LEGAL_BERLAKU } from "@/lib/legal";

/** Satu blok isi bagian legal: paragraf (string) atau daftar butir (string[]). */
export type LegalIsi = (string | string[])[];

export type LegalBagian = {
  id: string;
  judul: string;
  isi: LegalIsi;
};

/**
 * Kerangka bersama halaman legal standar internasional.
 * Struktur: hero gelap bernuansa yang sama dengan halaman lain,
 * lalu artikel bernomor yang mudah dirujuk (untuk penegakan hukum & audit).
 */
export function LegalPageShell({
  kicker,
  judul,
  intro,
  bagian,
  extra,
}: {
  kicker: string;
  judul: React.ReactNode;
  intro: string;
  bagian: LegalBagian[];
  /** Konten tambahan khusus halaman (mis. tabel cookie) — dirender setelah semua bagian. */
  extra?: React.ReactNode;
}) {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--gn-abyss)] pb-16 pt-32 text-[#e6eef8] sm:pb-20 sm:pt-40">
        <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
        <div className="glow-amber absolute -top-32 left-[-8%] h-[420px] w-[420px]" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="kicker kicker-on-dark">{kicker}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl">{judul}</h1>
            <p className="mt-6 text-base leading-relaxed text-[#a9bcd6] sm:text-lg">{intro}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#254872] bg-[#0a1628]/60 px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-[var(--gn-amber-300)]">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              BERLAKU SEJAK {LEGAL_BERLAKU.toUpperCase()}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Artikel */}
      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {bagian.map((b, i) => (
            <Reveal key={b.id} delay={Math.min(i * 0.03, 0.15)}>
              <article
                aria-labelledby={`bagian-${b.id}`}
                className={
                  i === 0
                    ? "pb-10"
                    : "mt-10 border-t border-border pt-10"
                }
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl font-bold text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`bagian-${b.id}`} className="font-display text-xl font-bold sm:text-2xl">
                    {b.judul}
                  </h2>
                </div>
                <div className="mt-5 space-y-4 pl-0 sm:pl-12">
                  {b.isi.map((blok, j) =>
                    Array.isArray(blok) ? (
                      <ul key={j} className="space-y-2.5">
                        {blok.map((butir) => (
                          <li
                            key={butir.slice(0, 48)}
                            className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span
                              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gn-amber-500)]"
                              aria-hidden
                            />
                            <span>{butir}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                        {blok}
                      </p>
                    )
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          {/* Konten tambahan khusus halaman */}
          {extra}

          {/* Kartu kanal legal */}
          <Reveal delay={0.1} className="mt-14">
            <aside className="rounded-3xl border border-[var(--gn-amber-500)]/40 bg-[var(--gn-amber-tint)] p-7 dark:bg-[var(--gn-amber-500)]/5">
              <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[var(--gn-amber-800)] dark:text-[var(--gn-amber-300)]">
                KANAL RESMI UNTUK HAL LEGAL
              </p>
              <address className="mt-5 grid gap-4 not-italic sm:grid-cols-3">
                <a
                  href={`mailto:${OPERATOR.email}`}
                  className="flex items-start gap-3 text-sm text-[var(--gn-navy-900)] transition-opacity hover:opacity-70 dark:text-[#e6eef8]"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
                  <span className="break-all">{OPERATOR.email}</span>
                </a>
                <a
                  href={`tel:+6281234514669`}
                  className="flex items-start gap-3 text-sm text-[var(--gn-navy-900)] transition-opacity hover:opacity-70 dark:text-[#e6eef8]"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
                  <span>{OPERATOR.teleponTampil}</span>
                </a>
                <p className="flex items-start gap-3 text-sm text-[var(--gn-navy-900)] dark:text-[#e6eef8]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gn-amber-600)] dark:text-[var(--gn-amber-400)]" aria-hidden />
                  <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
                </p>
              </address>
            </aside>
          </Reveal>

          {/* Silang tautan dokumen legal */}
          <Reveal delay={0.12} className="mt-10">
            <nav
              aria-label="Dokumen legal lainnya"
              className="flex flex-wrap items-center justify-center gap-2.5"
            >
              {[
                { href: "/privacy", label: "Kebijakan Privasi" },
                { href: "/terms", label: "Syarat & Ketentuan" },
                { href: "/cookies", label: "Kebijakan Cookie" },
                { href: "/faq", label: "FAQ" },
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
    </PublicShell>
  );
}
