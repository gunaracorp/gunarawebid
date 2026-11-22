"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Compass } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/components/gunara/nav-links";
import { cn } from "@/lib/utils";

export function GunaraMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Monogram Gunara"
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="11" className="fill-card" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="11"
        fill="none"
        className="stroke-border"
        strokeWidth="1"
      />
      <path
        d="M 33 12.6 A 14 14 0 1 0 37.9 26.6 L 24.6 26.6"
        fill="none"
        className="stroke-[var(--gn-amber-500)]"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="34.5" cy="34.5" r="2.6" className="fill-[var(--gn-amber-400)]" />
    </svg>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Ganti mode terang / gelap"
      title="Ganti mode terang / gelap"
      className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden />
      <Moon className="h-5 w-5 dark:hidden" aria-hidden />
    </Button>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — tandai section yang sedang berada di viewport.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const pos = window.scrollY + 160;
      let current = "";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.offsetTop <= pos) current = link.href.slice(1);
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-all duration-300 supports-[backdrop-filter]:bg-background/70",
        scrolled ? "border-border/70 shadow-lg shadow-black/5" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#beranda"
          className="group flex items-center gap-3 rounded-lg"
          aria-label="Gugun Gunara — kembali ke beranda"
        >
          <GunaraMonogram />
          <span className="leading-none">
            <span className="block font-display text-base font-bold tracking-[0.18em]">
              GUNARA
            </span>
            <span className="block font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
              .WEB.ID
            </span>
          </span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#kontak"
            className="hidden h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-amber-500/10 transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Compass className="h-4 w-4" aria-hidden />
            Konsultasi
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full lg:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-background">
              <SheetTitle className="font-display tracking-[0.18em]">GUNARA</SheetTitle>
              <nav aria-label="Navigasi seluler" className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-[color-mix(in_srgb,var(--gn-amber-500)_14%,transparent)] text-[var(--gn-amber-700)] dark:text-[var(--gn-amber-400)]"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
