import Link from "next/link";
import { GunaraMonogram, SiteHeader } from "@/components/gunara/site-header";
import { NAV_LINKS, EKOSISTEM_LINKS } from "@/components/gunara/nav-links";
import { ScrollProgress } from "@/components/gunara/scroll-progress";
import { BackToTop } from "@/components/gunara/back-to-top";

/** Tautan dokumen legal & bantuan — standar situs internasional. */
const LEGAL_LINKS = [
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/cookies", label: "Kebijakan Cookie" },
  { href: "/faq", label: "FAQ" },
] as const;

/** Shell situs publik — header sticky, main fleksibel, footer menempel di bawah. */
export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main id="konten-utama" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_0.85fr_0.75fr]">
          <div>
            <div className="flex items-center gap-3">
              <GunaraMonogram className="h-10 w-10" />
              <span className="leading-none">
                <span className="block font-display text-base font-bold tracking-[0.18em]">
                  GUNARA
                </span>
                <span className="block font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
                  .WEB.ID
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Pusat kendali ekosistem digital Gugun Gunara. Arsitek di balik Gunara OS, UMEA™ —
              Hukum Minimum Usaha™, G-DOS, dan UWA-7. Sekretaris Jenderal MUHDIN Indonesia.
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Situs
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[var(--gn-amber-700)] dark:hover:text-[var(--gn-amber-400)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tautan ekosistem">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Ekosistem
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {EKOSISTEM_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-[var(--gn-amber-700)] dark:hover:text-[var(--gn-amber-400)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tautan legal">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[var(--gn-amber-700)] dark:hover:text-[var(--gn-amber-400)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>© 2026 Gugun Gunara. Seluruh hak cipta.</span>
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
              v1.1.0.3 · GUNARA-OS
            </span>
          </p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
            DIBANGUN DI ATAS ARSITEKTUR UWA-7 · STRUKTUR SEBELUM KARYA
          </p>
        </div>
      </div>
    </footer>
  );
}
