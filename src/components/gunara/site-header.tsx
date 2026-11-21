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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
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
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
