"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, LogOut, Palette, FileLock2, Route, LayoutDashboard, Newspaper, Command } from "lucide-react";
import { GunaraMonogram } from "@/components/gunara/site-header";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/internal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/internal/cms", label: "CMS", icon: Newspaper },
  { href: "/internal/identitas", label: "Identitas", icon: Palette },
  { href: "/internal/dokumen", label: "Dokumen", icon: FileLock2 },
  { href: "/internal/roadmap", label: "Roadmap", icon: Route },
];

/** Chrome area internal — navigasi tab + tombol keluar. */
export function InternalTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/internal" ? pathname === "/internal" : pathname.startsWith(href);

  async function keluar() {
    await fetch("/api/internal/auth", { method: "DELETE" });
    router.replace("/internal/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1b3455] bg-[#060d1f]/92 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GunaraMonogram />
            <span className="leading-none">
              <span className="block font-display text-sm font-bold tracking-[0.18em]">
                GUNARA <span className="text-[var(--gn-amber-400)]">INTERNAL</span>
              </span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.22em] text-[#5c87b8]">
                RAHASIA · TIDAK DIINDEKS
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("gn:palette"))}
              title="Palet perintah (Ctrl/Cmd+K)"
              aria-label="Buka palet perintah"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#1b3455] px-3.5 text-sm font-medium text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)]"
            >
              <Command className="h-4 w-4" aria-hidden />
              <kbd className="hidden font-mono text-[10px] tracking-[0.14em] text-[#5c87b8] md:inline">⌘K</kbd>
            </button>
            <a
              href="/"
              className="hidden h-10 items-center gap-2 rounded-full border border-[#1b3455] px-4 text-sm font-medium text-[#a9bcd6] transition-colors hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)] sm:inline-flex"
            >
              <Home className="h-4 w-4" aria-hidden />
              Situs Publik
            </a>
            <button
              type="button"
              onClick={keluar}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#1b3455] px-4 text-sm font-semibold text-[#a9bcd6] transition-colors hover:border-red-500/60 hover:text-red-300"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>

        <nav aria-label="Navigasi internal" className="nice-scroll -mb-px flex gap-1 overflow-x-auto pb-3">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              aria-current={isActive(t.href) ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(t.href)
                  ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_16%,transparent)] text-[var(--gn-amber-400)]"
                  : "text-[#5c87b8] hover:bg-[#0a1628] hover:text-[#a9bcd6]"
              )}
            >
              <t.icon className="h-4 w-4" aria-hidden />
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
