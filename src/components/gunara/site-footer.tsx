import { GunaraMonogram } from "@/components/gunara/site-header";
import { NAV_LINKS, EKOSISTEM_LINKS } from "@/components/gunara/nav-links";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
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
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-[var(--gn-amber-700)] dark:hover:text-[var(--gn-amber-400)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Tautan ekosistem">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Ekosistem
            </p>
            <ul className="mt-4 space-y-2.5">
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
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>© 2026 Gugun Gunara. Seluruh hak cipta.</span>
            <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-muted-foreground">
              v1.0.0.1 · BASELINE
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
